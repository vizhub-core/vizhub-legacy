import React from 'react';
import { LoadingScreen } from '../LoadingScreen';
import { PreferencesProvider, StudioDataProvider } from '../contexts';
import { URLStateProvider } from './urlState';
import { StudioBody } from './StudioBody';

export const Studio = () => (
  <StudioDataProvider fallback={<LoadingScreen />}>
    <URLStateProvider>
      <PreferencesProvider>
        <StudioBody />
      </PreferencesProvider>
    </URLStateProvider>
  </StudioDataProvider>
);
