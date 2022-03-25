import React, { useState, useEffect } from 'react';
import {
  VIZ_INFO_COLLECTION,
  VIZ_CONTENT_COLLECTION,
} from 'vizhub-interactors/constants';
import { logShareDBError } from './logShareDBError';

// This hook sets up a live updating representation of a viz.
export const useViz = ({
  vizSnapshot: { vizInfoSnapshot, vizContentSnapshot },
  shareDBConnection,
}) => {
  // Initialize the viz from server rendered snapshot data.
  // Gets set to null when the viz is deleted.
  const [viz, setViz] = useState({
    vizInfo: vizInfoSnapshot.data,
    vizContent: vizContentSnapshot.data,
  });

  const [vizContentDoc, setVizContentDoc] = useState(null);

  // In the client only, connect the viz to real time updates via ShareDB.
  useEffect(() => {
    if (shareDBConnection) {
      const { id } = vizInfoSnapshot.data;
      const vizInfoDoc = shareDBConnection.get(VIZ_INFO_COLLECTION, id);
      const vizContentDoc = shareDBConnection.get(VIZ_CONTENT_COLLECTION, id);

      // Verified manually that ingestSnapshot is working 3/17/22.
      // To verify, comment out the following ingestSnapshot line,
      // refresh, in Chrome DevTools look in WebSocket (WS) section,
      // observe that a message is sent back with the entire vizInfo doc.
      // The message looks like `{"data":{"v":4,"data":{"id":"viz1", ... `.
      // Uncomment the following ingestSnapshot line and observe that the
      // message with the entire vizInfo doc is never sent, only the updates are.
      vizInfoDoc.ingestSnapshot(vizInfoSnapshot, logShareDBError);
      vizContentDoc.ingestSnapshot(vizContentSnapshot, logShareDBError);

      // Subscribe to real time updates.
      vizInfoDoc.subscribe(logShareDBError);
      vizContentDoc.subscribe(logShareDBError);

      // Expose the VizContent ShareDB doc to downstream code (e.g. CodeMirror+JSON1).
      setVizContentDoc(vizContentDoc);

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

      // Handle deletion of the viz we are viewing.
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

  return { viz, vizContentDoc };
};
