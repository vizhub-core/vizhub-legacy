import React from 'react';
import { LoadingScreen } from '../../LoadingScreen';
import { VizPageDataProvider } from './VizPageDataContext';
import { URLStateProvider } from './URLStateContext';
import { VizPageBody } from './VizPageBody';

export const VizPage = () => (
  <URLStateProvider>
    <VizPageDataProvider fallback={<LoadingScreen />}>
      <VizPageBody />
    </VizPageDataProvider>
  </URLStateProvider>
);
