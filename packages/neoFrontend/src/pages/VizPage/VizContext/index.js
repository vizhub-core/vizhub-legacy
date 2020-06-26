import React, { createContext, useContext } from 'react';
import { useViz } from '../../../vizRealTimeHooks/useViz';
import { VizPageDataContext } from '../VizPageDataContext';

export const VizContext = createContext();

export const VizProvider = ({ children }) => {
  const vizPageData = useContext(VizPageDataContext);
  const contextValue = useViz(vizPageData.visualization);

  return (
    <VizContext.Provider value={contextValue}>{children}</VizContext.Provider>
  );
};
