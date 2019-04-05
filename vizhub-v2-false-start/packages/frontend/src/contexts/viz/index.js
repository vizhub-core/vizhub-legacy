import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudioDataContext } from '../studioData';
import { URLStateContext } from '../urlState';
import { type as json0 } from 'ot-json0';
import { connection } from './connection';

// Convenience method for avoiding use of ShareDB client during development
const avoidShareDB = true;

export const VizContext = createContext();

const clone = obj => JSON.parse(JSON.stringify(obj));

const useVizStub = (vizId, vizSnapshots) => {
  const snapshot = vizSnapshots[vizId];
  const [data, setData] = useState(snapshot.data);
  const [viz, setViz] = useState();
  useEffect(() => {
    setViz({
      data,
      submitOp: op => {
        setData(clone(json0.apply(data, op)));
      }
    });
  }, [vizId, vizSnapshots]);
  return viz;
};

const useVizShareDB = snapshot => {
  //const viz = connection.get('viz', vizId);
  //viz.ingestSnapshot(vizSnapshots[vizId]);
  //setViz(viz);
};

const useViz = avoidShareDB ? useVizStub : useVizShareDB;

export const VizProvider = ({ children }) => {
  const { vizId } = useContext(URLStateContext);
  const { vizSnapshots } = useContext(StudioDataContext);
  const viz = useViz(vizId, vizSnapshots);

  return viz ? (
    <VizContext.Provider value={viz}>{children}</VizContext.Provider>
  ) : null;
};
