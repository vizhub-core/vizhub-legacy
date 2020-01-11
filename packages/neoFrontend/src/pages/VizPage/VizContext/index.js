import React, { createContext, useContext } from 'react';
import { VizPageDataContext } from '../VizPageDataContext';
import { useViz } from './useViz';

export const VizContext = createContext();

export const VizProvider = ({ children }) => {
  const vizPageData = useContext(VizPageDataContext);
  const contextValue = useViz(vizPageData.visualization);

  return (
    <VizContext.Provider value={contextValue}>{children}</VizContext.Provider>
  );
};
