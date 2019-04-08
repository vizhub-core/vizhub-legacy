import { useState, useEffect, useMemo } from 'react';
import { getConnection } from './getConnection';

export const useVizShareDB = (vizId, vizSnapshots) => {
  const [vizData, setVizData] = useState(vizSnapshots[vizId].data);

  const mutable = useMemo(() => {
    const opBuffer = [];
    const submitOp = op => {
      // TODO remind the user at this point that
      // the connection is still being established
      opBuffer.push(op);
    };
    return { opBuffer, submitOp };
  }, []);

  const submitVizOp = op => mutable.submitOp(op);

  useEffect(() => {
    const connection = getConnection();
    const doc = connection.get('viz', vizId);

    // TODO check case of navigating between Viz pages
    // if(!doc.type) {

    // Hydrate the ShareDB document with the data from the API call.
    // Without this we'd re-fetch the same data unnecessarily in doc.subscribe.
    doc.ingestSnapshot(vizSnapshots[vizId]);
    // }

    // Subscribe to document updates via WebSocket.
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

    // Update the data passed out of the hook.
    const updateData = () => {
      // Use Object.assign so react hooks pick up the change.
      setVizData(Object.assign({}, doc.data));
    };

    // Update the data whenever we receive an op (from local or remote).
    doc.on('op', updateData);

    // Clean up the listener via hooks lifecycle.
    return () => doc.off('op', updateData);
  }, [vizId]);

  return { vizData, submitVizOp };
};
