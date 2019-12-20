import React, { createContext, useContext } from 'react';
import { ErrorContext } from '../../../ErrorContext';
import { useVizPageData } from './useVizPageData';

export const VizPageDataContext = createContext();

export const VizPageDataProvider = ({ fallback, children }) => {
  const vizPageData = useVizPageData();
  const { setError } = useContext(ErrorContext);

  if (vizPageData && vizPageData.error) {
    setError({
      message: 'Visualization not found.',
      className: 'test-viz-not-found'
    });
    return null;
  }

  return vizPageData ? (
    <VizPageDataContext.Provider value={vizPageData}>
      {children}
    </VizPageDataContext.Provider>
  ) : (
    fallback
  );
};
