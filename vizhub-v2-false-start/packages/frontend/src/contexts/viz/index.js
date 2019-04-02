import React, { createContext, useContext } from 'react';
import { StudioDataContext } from '../';

export const VizContext = createContext();

export const VizProvider = ({ children }) => {
  const { vizData } = useContext(StudioDataContext);
  const viz = {
    data: vizData,
    submitOp: op => {
      console.log('submitt');
      console.log(JSON.stringify(op));
    }
  };

  return <VizContext.Provider value={viz}>{children}</VizContext.Provider>;
};
