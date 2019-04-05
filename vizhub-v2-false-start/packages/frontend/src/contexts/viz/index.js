import React, { createContext, useContext } from 'react';
import { avoidShareDB } from '../../environment';
import { StudioDataContext } from '../studioData';
import { URLStateContext } from '../urlState';
import { useVizStub } from './useVizStub';
import { useVizShareDB } from './useVizShareDB';

const useViz = avoidShareDB ? useVizStub : useVizShareDB;

export const VizContext = createContext();

export const VizProvider = ({ children }) => {
  const { vizId } = useContext(URLStateContext);
  const { vizSnapshots } = useContext(StudioDataContext);
  const viz = useViz(vizId, vizSnapshots);

  return viz ? (
    <VizContext.Provider value={viz}>{children}</VizContext.Provider>
  ) : null;
};
