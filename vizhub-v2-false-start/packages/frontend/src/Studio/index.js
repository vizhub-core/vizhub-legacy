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
  <StudioDataProvider fallback={<LoadingScreen />}>
    <VizProvider>
      <URLStateProvider>
        <PreferencesProvider>
          <StudioBody />
        </PreferencesProvider>
      </URLStateProvider>
    </VizProvider>
  </StudioDataProvider>
);
