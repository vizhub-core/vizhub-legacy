import React, { createContext } from 'react';
import { isClient } from '../../isomorphic/isClient';
import { VizInfo } from '../../entities/VizInfo';
import shareDB from 'sharedb/lib/client';

console.log(!!shareDB);
export const VizContext = createContext();

export const VizContextProvider = ({ vizInfoSnapshot, children }) => {
  // TODO make this dynamic with ingestSnapshot if client rendered.
  // if(isClient){
  // ingestSnapshot(vizInfoSnapshot);
  // }
  const viz = {
    vizInfo: VizInfo(vizInfoSnapshot.data),
    //vizContent: VizContent(vizContentSnapshot.data),
  };
  return <VizContext.Provider value={viz}>{children}</VizContext.Provider>;
};
