import React, { createContext, useEffect, useState } from 'react';
import ShareDB from 'sharedb/lib/client';
import { isClient } from './isClient';

// On the server side, we need to set up json1.
// On the client side, this is already done in the build.
// See https://github.com/vizhub-core/sharedb-client-browser
//if (!isClient) {
//  const json1 = require('ot-json1');
//  ShareDB.types.register(json1.type);
//  ShareDB.types.defaultType = json1.type;
//}

export const VizContext = createContext();

export const VizContextProvider = ({
  vizInfoSnapshot,
  vizContentSnapshot,
  children,
}) => {
  // Initialize the viz from server rendered snapshot data.
  const [viz, setViz] = useState({
    vizInfo: vizInfoSnapshot.data,
    vizContent: vizContentSnapshot.data,
  });

  // In the client, connect the viz to real time updates via ShareDB.
  useEffect(() => {
    if (isClient) {
      console.log('here');
      // TODO wss for prod
      const socket = new WebSocket('ws://' + window.location.host);
      const shareDBConnection = new ShareDB.Connection(socket);

      const { id } = vizInfoSnapshot;
      const vizInfoShareDBDoc = shareDBConnection.get('documentInfo', id);
      const vizContentShareDBDoc = shareDBConnection.get('documentContent', id);

      const logError = (error) => {
        // TODO instrument this to log errors to the server, so they can be traced and fixed
        if (error) console.log(error);
      };

      vizInfoShareDBDoc.ingestSnapshot(vizInfoSnapshot, logError);
      vizInfoShareDBDoc.subscribe(logError);

      vizContentShareDBDoc.ingestSnapshot(vizContentSnapshot, logError);
      vizContentShareDBDoc.subscribe(logError);

      const updateViz = () => {
        setViz({
          vizInfo: VizInfo(vizInfoShareDBDoc.data),
          vizContent: VizContent(vizContentShareDBDoc.data),
        });
      };

      vizContentShareDBDoc.on('op batch', updateViz);
      vizInfoShareDBDoc.on('op batch', updateViz);
    }
  }, []);

  return <VizContext.Provider value={viz}>{children}</VizContext.Provider>;
};
