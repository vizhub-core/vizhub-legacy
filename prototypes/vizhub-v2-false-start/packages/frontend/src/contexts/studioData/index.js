import React, { createContext, useContext } from 'react';
import { useStudioData } from './useStudioData';
import { URLStateContext } from '../';

// The term "Studio Data" refers to the initial API request for data
// to hydrate the Viz Studio page, which is different for each Viz.
// This is _not_ the real-time synchronized object.
// For that, use the Viz context.

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
