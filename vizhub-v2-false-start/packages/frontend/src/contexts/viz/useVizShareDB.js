import { useState, useEffect, useMemo } from 'react';
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

    // TODO check case of navigating between Viz pages
    // if(!doc.type) {
    //   doc.ingestSnapshot(vizSnapshots[vizId]);
    // }

    // Hydrate the ShareDB document with the data from the API call.
    // Without this we'd re-fetch the same data unnecessarily in doc.subscribe.
    shareDBDoc.ingestSnapshot(vizSnapshots[vizId]);

    return shareDBDoc;
  }, [vizId]);

  const submitVizPresence = useMemo(() => doc.submitPresence.bind(doc), [doc]);

  const subscribeToVizOps = handleOp => {
    doc.on('op', handleOp);
    return () => doc.off('op', handleOp);
  };

  const subscribeToVizPresence = handlePresence => {
    const callback = srcList => {
      handlePresence(srcList.map(src => doc.presence[src]));
    };
    doc.on('presence', callback);
    return () => doc.off('presence', callback);
  };

  // Subscribe to document updates via WebSocket.
  useEffect(() => {
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
  }, [vizId]);

  // Update vizData when ShareDB document changes.
  // Use Object.assign so react hooks pick up the change.
  useEffect(
    () =>
      subscribeToVizOps(() => {
        setVizData(Object.assign({}, doc.data));
      }),
    [vizId]
  );

  return {
    vizData,
    submitVizOp,
    subscribeToVizOps,
    submitVizPresence,
    subscribeToVizPresence
  };
};
