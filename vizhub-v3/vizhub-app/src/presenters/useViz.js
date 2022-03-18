import React, { useState, useEffect } from 'react';
import {
  VIZ_INFO_COLLECTION,
  VIZ_CONTENT_COLLECTION,
} from 'vizhub-interactors/constants';
import { useShareDBConnection } from './useShareDBConnection';

// This hook sets up a live updating representation of a viz.
export const useViz = ({ vizInfoSnapshot, vizContentSnapshot }) => {
  // Initialize the viz from server rendered snapshot data.
  // Gets set to null when the viz is deleted.
  const [viz, setViz] = useState({
    vizInfo: vizInfoSnapshot.data,
    vizContent: vizContentSnapshot.data,
  });

  // Initialize the ShareDB connection via WebSocket.
  const shareDBConnection = useShareDBConnection();

  // In the client only, connect the viz to real time updates via ShareDB.
  useEffect(() => {
    if (shareDBConnection) {
      const { id } = vizInfoSnapshot.data;
      const vizInfoDoc = shareDBConnection.get(VIZ_INFO_COLLECTION, id);
      const vizContentDoc = shareDBConnection.get(VIZ_CONTENT_COLLECTION, id);

      const logError = (error) => {
        // TODO instrument this to log errors to the server, so they can be traced and fixed
        if (error) console.log(error);
      };

      // Verified manually that ingestSnapshot is working 3/17/22.
      // To verify, comment out the following ingestSnapshot line,
      // refresh, oepn DevTools, look in WebSocket (WS) section,
      // observe that a message is sent back with the entire vizInfo doc.
      // The message looks like `{"data":{"v":4,"data":{"id":"viz1", ... `.
      // Uncomment the following ingestSnapshot line and observe that the
      // message with the entire vizInfo doc is never sent, only the updates are.
      vizInfoDoc.ingestSnapshot(vizInfoSnapshot, logError);
      vizContentDoc.ingestSnapshot(vizContentSnapshot, logError);

      // Subscribe to real time updates.
      vizInfoDoc.subscribe(logError);
      vizContentDoc.subscribe(logError);

      // Process real time updates by updating state.
      // Note: we are using JSON1, which uses immutable patterns, so we can
      // assume that `doc.data` is a fresh new object after each change.
      // Unfortunately if you are using JSON0, this approach would not work.
      // See https://github.com/ottypes/json0/issues/26 for a workaround.
      const updateViz = () => {
        setViz({
          vizInfo: vizInfoDoc.data,
          vizContent: vizContentDoc.data,
        });
      };
      vizContentDoc.on('op batch', updateViz);
      vizInfoDoc.on('op batch', updateViz);

      // TODO handle deletion of the viz we are viewing.
      // What should happen?
      // Probably should display 404.
      // Easiest way is to trigger a reload?
      // But that would not work well with caching...
      // Maybe we set a piece of state up high in the app "vizDeleted",
      // and in that case we transition client-side to render the 404 page?
      // Or, should we show a notice like "This viz was deleted." ?
      vizInfoDoc.on('del', () => {
        setViz(null);
      });

      // TODO verify that this cleanup is working?
      // Note: with the current setup, this would never be invoked,
      // because page navigation is done using <a href="...">,
      // causing a full page reload, and navigating away from the viz page
      // using some sort of client-side routing (which does not exist here)
      // is the only circumstance where this cleanup would be triggered.
      // This would trigger during the transition to show 404 page.
      return () => {
        vizContentDoc.off('op batch', updateViz);
        vizInfoDoc.off('op batch', updateViz);
      };
    }
  }, [shareDBConnection]);

  return viz;
};
