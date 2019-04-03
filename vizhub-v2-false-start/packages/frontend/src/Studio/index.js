import React from 'react';
import { LoadingScreen } from '../LoadingScreen';
import {
  PreferencesProvider,
  StudioDataProvider,
  VizProvider,
  URLStateProvider
} from '../contexts';
import { StudioBody } from './StudioBody';

export const Studio = () => (
  <URLStateProvider>
    <StudioDataProvider fallback={<LoadingScreen />}>
      <VizProvider>
        <PreferencesProvider>
          <StudioBody />
        </PreferencesProvider>
      </VizProvider>
    </StudioDataProvider>
  </URLStateProvider>
);
