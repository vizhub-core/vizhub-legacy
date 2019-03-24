import React from 'react';
import { LoadingScreen } from '../LoadingScreen';
import { PreferencesProvider } from '../preferences';
import { URLStateProvider } from './urlState';
import { StudioBody } from './StudioBody';
import { useViewerData } from './useViewerData';
import { ViewerDataContext } from './ViewerDataContext';

export const Studio = () => {
  const viewerData = useViewerData();

  return viewerData ? (
    <ViewerDataContext.Provider value={viewerData}>
      <URLStateProvider>
        <PreferencesProvider>
          <StudioBody />
        </PreferencesProvider>
      </URLStateProvider>
    </ViewerDataContext.Provider>
  ) : (
    <LoadingScreen />
  );
};
