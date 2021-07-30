import React, { createContext, useEffect, useState } from 'react';
import shareDB from 'sharedb/lib/client';
import { isClient } from '../../isomorphic/isClient';
import { VizInfo } from '../../entities/VizInfo';
import { VizContent } from '../../entities/VizContent';

export const VizContext = createContext();

export const VizContextProvider = ({
  vizInfoSnapshot,
  vizContentSnapshot,
  children,
}) => {
  // Initialize the viz from server rendered snapshot data.
  const [viz, setViz] = useState({
    vizInfo: VizInfo(vizInfoSnapshot.data),
    vizContent: VizContent(vizContentSnapshot.data),
  });

  // In the client, connect the viz to real time updates via ShareDB.
  useEffect(() => {
    if (isClient) {
      const socket = new WebSocket('ws://' + window.location.host);
      const shareDBConnection = new shareDB.Connection(socket);

      const { id } = vizInfoSnapshot;
      const vizInfoShareDBDoc = shareDBConnection.get('documentInfo', id);
      const vizContentShareDBDoc = shareDBConnection.get('documentContent', id);

      const logError = (error) => {
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
