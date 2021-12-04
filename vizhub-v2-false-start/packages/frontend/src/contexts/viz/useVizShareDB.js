import { useState, useEffect, useMemo, useCallback } from 'react';
import { getConnection } from './getConnection';

export const useVizShareDB = (vizId, vizSnapshots) => {
  const [vizData, setVizData] = useState(vizSnapshots[vizId].data);

  // This mutable object contains a "submitOp" function,
  // which buffers pending ops before the ShareDB subscription finishes,
  // and passes through to the ShareDB document after subscription.
  const mutable = useMemo(() => {
    const opBuffer = [];
    const submitOp = op => {
      // TODO (UX) remind the user at this point that
      // the connection is still being established
      opBuffer.push(op);
    };
    return { opBuffer, submitOp };
  }, []);

  // This callback is stable, in that it will always use
  // the most up-to-date submitOp stored on the mutable object.
  const submitVizOp = op => mutable.submitOp(op);

  // Set up the ShareDB doc and subscription logic.
  const doc = useMemo(() => {
    const shareDBDoc = getConnection().get('viz', vizId);

    // TODO add automated test coverage for this case of navigating between Viz pages.
    if (!shareDBDoc.type) {
      // Hydrate the ShareDB document with the data from the API call.
      // Without this we'd re-fetch the same data unnecessarily in doc.subscribe.
      shareDBDoc.ingestSnapshot(vizSnapshots[vizId]);
    }

    return shareDBDoc;
  }, [vizId, vizSnapshots]);

  const submitVizPresence = useMemo(() => doc.submitPresence.bind(doc), [doc]);

  const subscribeToVizOps = useCallback(
    handleOp => {
      doc.on('op', handleOp);
      return () => doc.off('op', handleOp);
    },
    [doc]
  );

  const subscribeToVizPresence = handlePresence => {
    const callback = srcList => {
      //handlePresence(srcList.map(src => doc.presence[src]).filter(d => d));
      //console.log(doc.presence);
      //
      // TODO add a test for this.
      handlePresence(Object.values(doc.presence).filter(d => d));
    };
    doc.on('presence', callback);
    return () => doc.off('presence', callback);
  };

  // Subscribe to document updates via WebSocket.
  useEffect(() => {
    // TODO unsubscribe.
    doc.subscribe(err => {
      // This should never happen. Not sure when it would.
      if (err) throw err;

      // Avoid errors related to "this" binding.
      const submitOp = op => doc.submitOp(op);

      // Flush the ops from user interaction before subscription.
      // These occur within the first 1-2 seconds after page load,
      // after the JS runs and before the WebSocket connects.
      mutable.opBuffer.forEach(submitOp);

      // Make it so all future user interactions go directly to ShareDB.
      mutable.submitOp = submitOp;
    });
  }, [vizId, doc, mutable]);

  // Update vizData when ShareDB document changes.
  // Use Object.assign so react hooks pick up the change.
  //
  // TODO look into making JSON0 immutable, or migrate to JSON1.
  useEffect(
    () =>
      subscribeToVizOps(() => {
        setVizData(Object.assign({}, doc.data));
      }),
    [vizId, doc.data, subscribeToVizOps]
  );

  // Handle the case of navigating back and forth between two visualizations
  // whose StudioData has already been fetched.
  useEffect(() => {
    setVizData(doc.data);
  }, [vizId, doc.data]);

  return {
    vizId,
    vizData,
    submitVizOp,
    subscribeToVizOps,
    submitVizPresence,
    subscribeToVizPresence
  };
};
