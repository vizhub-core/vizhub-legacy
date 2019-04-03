import React from 'react';
import { LoadingScreen } from '../LoadingScreen';
import {
  PreferencesProvider,
  StudioDataProvider,
  VizProvider,
  URLStateProvider
} from '../contexts';
import { StudioBody } from './StudioBody';

const ErrorPage = ({ error }) => <div>Error: {error}</div>;

const fallback = error =>
  error ? <ErrorPage error={error} /> : <LoadingScreen />;

export const Studio = () => (
  <URLStateProvider>
    <StudioDataProvider fallback={fallback}>
      <VizProvider>
        <PreferencesProvider>
          <StudioBody />
        </PreferencesProvider>
      </VizProvider>
    </StudioDataProvider>
  </URLStateProvider>
);
