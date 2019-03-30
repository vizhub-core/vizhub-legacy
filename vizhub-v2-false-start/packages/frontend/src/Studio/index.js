import React from 'react';
import { LoadingScreen } from '../LoadingScreen';
import { PreferencesProvider } from '../contexts';
import { URLStateProvider } from './urlState';
import { StudioBody } from './StudioBody';
import { useStudioData } from './useStudioData';
import { StudioDataContext } from './StudioDataContext';

export const Studio = () => {
  const studioData = useStudioData();

  return studioData ? (
    <StudioDataContext.Provider value={studioData}>
      <URLStateProvider>
        <PreferencesProvider>
          <StudioBody />
        </PreferencesProvider>
      </URLStateProvider>
    </StudioDataContext.Provider>
  ) : (
    <LoadingScreen />
  );
};
