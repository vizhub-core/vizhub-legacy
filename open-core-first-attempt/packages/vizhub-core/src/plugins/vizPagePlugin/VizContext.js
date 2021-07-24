import React, { createContext, useEffect, useState } from 'react';
import shareDB from 'sharedb/lib/client';
import { isClient } from '../../isomorphic/isClient';
import { VizInfo } from '../../entities/VizInfo';

export const VizContext = createContext();

export const VizContextProvider = ({ vizInfoSnapshot, children }) => {
  const [viz, setViz] = useState({
    vizInfo: VizInfo(vizInfoSnapshot.data),
    //vizContent: VizContent(vizContentSnapshot.data),
  });

  useEffect(() => {
    if (isClient) {
      const socket = new WebSocket('ws://' + window.location.host);
      const shareDBConnection = new shareDB.Connection(socket);
      const shareDBDoc = shareDBConnection.get(
        'documentInfo',
        vizInfoSnapshot.id
      );
      shareDBDoc.ingestSnapshot(vizInfoSnapshot, (error) => {
        if (error) return console.log(error);
        console.log('Successfully ingested snapshot');
      });
    }
  }, []);

  return <VizContext.Provider value={viz}>{children}</VizContext.Provider>;
};
