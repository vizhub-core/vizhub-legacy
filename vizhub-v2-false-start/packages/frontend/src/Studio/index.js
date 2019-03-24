import React from 'react';
import { LoadingScreen } from '../LoadingScreen';
import { PreferencesProvider } from '../preferences';
import { URLStateProvider } from './urlState';
import { StudioBody } from './StudioBody';
import { useViewerData } from './useViewerData';

export const Studio = () => {
  const viewerData = useViewerData();
  console.log(viewerData);

  return viewerData ? (
    <URLStateProvider>
      <PreferencesProvider>
        <StudioBody />
      </PreferencesProvider>
    </URLStateProvider>
  ) : (
    <LoadingScreen />
  );
};
