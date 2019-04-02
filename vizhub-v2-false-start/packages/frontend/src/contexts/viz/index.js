import React, { createContext, useContext, useState } from 'react';
import { StudioDataContext } from '../';
import { type as json0 } from 'ot-json0';

export const VizContext = createContext();

const clone = obj => JSON.parse(JSON.stringify(obj));

export const VizProvider = ({ children }) => {
  const { vizData } = useContext(StudioDataContext);

  // TODO replace this with ShareDB Doc.
  const [data, setData] = useState(vizData);
  const viz = {
    data,
    submitOp: op => {
      setData(clone(json0.apply(data, op)));
    }
  };

  return <VizContext.Provider value={viz}>{children}</VizContext.Provider>;
};
