import React, { createContext } from 'react';
import { useStudioData } from './useStudioData';

export const StudioDataContext = createContext();

export const StudioDataProvider = ({ fallback, children }) => {
  const studioData = useStudioData();

  return studioData ? (
    <StudioDataContext.Provider value={studioData}>
      {children}
    </StudioDataContext.Provider>
  ) : (
    fallback
  );
};
