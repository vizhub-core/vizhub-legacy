import React from 'react';
import { ThemeProvider } from 'styled-components';
import { LoadingScreen } from '../../LoadingScreen';
import { darkNavbarTheme } from '../../theme';
import { VizPageDataProvider } from './VizPageDataContext';
import { URLStateProvider } from './URLStateContext';
import { Body } from './Body';

export const VizPage = () => (
  <URLStateProvider>
    <VizPageDataProvider fallback={<LoadingScreen />}>
      <ThemeProvider theme={darkNavbarTheme}>
        <Body />
      </ThemeProvider>
    </VizPageDataProvider>
  </URLStateProvider>
);
