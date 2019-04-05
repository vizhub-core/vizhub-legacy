import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudioDataContext } from '../studioData';
import { URLStateContext } from '../urlState';
import { type as json0 } from 'ot-json0';
import { getConnection } from './getConnection';

// Convenience method for avoiding use of ShareDB client during development
const avoidShareDB = false;

export const VizContext = createContext();

const clone = obj => JSON.parse(JSON.stringify(obj));

const useVizStub = (vizId, vizSnapshots) => {
  const [data, setData] = useState(vizSnapshots[vizId].data);
  const [viz, setViz] = useState();
  useEffect(() => {
    setViz({
      data,
      submitOp: op => {
        setData(clone(json0.apply(data, op)));
      }
    });
  }, [vizId]);
  return viz;
};

const useVizShareDB = (vizId, vizSnapshots) => {
  const [viz, setViz] = useState();

  useEffect(() => {
    const connection = getConnection();
    const viz = connection.get('viz', vizId);

    // TODO check case of navigating between Viz pages
    // if(!viz.type) {
    viz.ingestSnapshot(vizSnapshots[vizId]);
    // }

    viz.subscribe(function(err) {
      if (err) throw err;
      setViz(viz);
    });
  }, [vizId]);

  return viz;
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
