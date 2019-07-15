import React, { createContext } from 'react';
import { useVizPageData } from './useVizPageData';

export const VizPageDataContext = createContext();

export const VizPageDataProvider = ({ fallback, children }) => {
  const createVizPageData = useVizPageData();

  return createVizPageData ? (
    <VizPageDataContext.Provider value={createVizPageData}>
      {children}
    </VizPageDataContext.Provider>
  ) : (
    fallback
  );
};
