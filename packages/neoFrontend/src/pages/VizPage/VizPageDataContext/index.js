import React, { createContext } from 'react';
import { useVizPageData } from './useVizPageData';

export const VizPageDataContext = createContext();

export const VizPageDataProvider = ({ fallback, children }) => {
  const vizPageData = useVizPageData();

  return vizPageData ? (
    <VizPageDataContext.Provider value={vizPageData}>
      {children}
    </VizPageDataContext.Provider>
  ) : (
    fallback
  );
};
