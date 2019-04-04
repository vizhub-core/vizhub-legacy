import React, { createContext, useContext, useState } from 'react';
import { StudioDataContext } from '../studioData';
import { URLStateContext } from '../urlState';
import { type as json0 } from 'ot-json0';
import { connection } from './connection';

// Convenience method for avoiding use of ShareDB client during development
const avoidShareDB = false;

export const VizContext = createContext();

const clone = obj => JSON.parse(JSON.stringify(obj));

export const VizProvider = ({ children }) => {
  const { vizId } = useContext(URLStateContext);
  const { vizSnapshots } = useContext(StudioDataContext);

  let viz;

  if (avoidShareDB) {
    const [data, setData] = useState(vizSnapshots[vizId].data);
    viz = {
      data,
      submitOp: op => {
        setData(clone(json0.apply(data, op)));
      }
    };
  } else {
    console.log('here');
    viz = connection.get('viz', vizId);
    viz.ingestSnapshot(vizSnapshots[vizId]);
  }

  return <VizContext.Provider value={viz}>{children}</VizContext.Provider>;
};
