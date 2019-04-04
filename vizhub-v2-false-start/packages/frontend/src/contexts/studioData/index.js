import React, { createContext, useContext } from 'react';
import { useStudioData } from './useStudioData';
import { URLStateContext } from '../';

export const StudioDataContext = createContext();

export const StudioDataProvider = ({ fallback, children }) => {
  const { vizId } = useContext(URLStateContext);
  const studioData = useStudioData(vizId);

  return studioData ? (
    <StudioDataContext.Provider value={studioData}>
      {children}
    </StudioDataContext.Provider>
  ) : (
    fallback
  );
};
