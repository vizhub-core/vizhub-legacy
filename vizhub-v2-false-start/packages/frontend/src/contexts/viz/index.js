import React, { createContext, useContext } from 'react';
import { StudioDataContext } from '../';
import { type as json0 } from 'ot-json0';

export const VizContext = createContext();

export const VizProvider = ({ children }) => {
  const { vizData } = useContext(StudioDataContext);
  const viz = {
    data: vizData,
    submitOp: op => {
      console.log(op);
      console.log(JSON.stringify(vizData.working.files, null, 2));
      json0.apply(vizData, op);
      console.log(JSON.stringify(vizData.working.files, null, 2));
    }
  };

  return <VizContext.Provider value={viz}>{children}</VizContext.Provider>;
};
