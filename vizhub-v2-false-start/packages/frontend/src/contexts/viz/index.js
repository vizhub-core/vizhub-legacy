import React, { createContext, useContext, useState } from 'react';
import { StudioDataContext } from '../studioData';
import { URLStateContext } from '../urlState';
import { type as json0 } from 'ot-json0';

export const VizContext = createContext();

const clone = obj => JSON.parse(JSON.stringify(obj));

export const VizProvider = ({ children }) => {
  const { vizId } = useContext(URLStateContext);
  const { vizSnapshots } = useContext(StudioDataContext);

  // TODO replace this with ShareDB Doc.
  const [data, setData] = useState(vizSnapshots[vizId].data);
  const viz = {
    data,
    submitOp: op => {
      setData(clone(json0.apply(data, op)));
    }
  };

  return <VizContext.Provider value={viz}>{children}</VizContext.Provider>;
};
