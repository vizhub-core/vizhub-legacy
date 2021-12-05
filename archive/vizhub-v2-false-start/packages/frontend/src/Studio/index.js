import React from 'react';
import { LoadingScreen } from '../LoadingScreen';
import {
  PreferencesProvider,
  StudioDataProvider,
  VizProvider,
  URLStateProvider,
  ErrorProvider
} from '../contexts';
import { StudioBody } from './StudioBody';
import { ErrorPage } from './ErrorPage';

export const Studio = () => (
  <URLStateProvider>
    <ErrorProvider errorPage={error => <ErrorPage error={error} />}>
      <StudioDataProvider fallback={<LoadingScreen />}>
        <VizProvider>
          <PreferencesProvider>
            <StudioBody />
          </PreferencesProvider>
        </VizProvider>
      </StudioDataProvider>
    </ErrorProvider>
  </URLStateProvider>
);
