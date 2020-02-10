import React from 'react';
import { ThemeProvider } from 'styled-components';
import { LoadingScreen } from '../../LoadingScreen';
import { darkNavbarTheme } from '../../theme';
import { VizPageDataProvider } from './VizPageDataContext';
import { ForkingProvider } from './ForkingContext';
import { DeleteVizProvider } from './DeleteVizContext';
import { SettingsProvider } from './SettingsContext';
import { URLStateProvider } from './URLStateContext';
import { VizRunnerProvider } from './VizRunnerContext';
import { VizProvider } from './VizContext';
import { PrettierProvider } from './PrettierContext';
import { RunProvider } from './RunContext';
import { WarningProvider } from './WarningContext';
import { RealtimeModulesProvider } from './RealtimeModulesContext';
import { ConnectionProvider } from './ConnectionContext';
import { EditorModulesProvider } from './EditorModulesContext';
import { SplitPaneResizeProvider } from './SplitPaneResizeContext';
import { Body } from './Body';

export const VizPage = () => (
  <URLStateProvider>
    <VizPageDataProvider fallback={<LoadingScreen />}>
      <RealtimeModulesProvider>
        <WarningProvider>
          <ConnectionProvider>
            <EditorModulesProvider>
              <VizProvider>
                <PrettierProvider>
                  <RunProvider>
                    <SettingsProvider>
                      <DeleteVizProvider
                        fallback={<LoadingScreen message="Deleting..." />}
                      >
                        <ForkingProvider
                          fallback={<LoadingScreen message="Forking..." />}
                        >
                          <ThemeProvider theme={darkNavbarTheme}>
                            <SplitPaneResizeProvider>
                              <VizRunnerProvider>
                                <Body />
                              </VizRunnerProvider>
                            </SplitPaneResizeProvider>
                          </ThemeProvider>
                        </ForkingProvider>
                      </DeleteVizProvider>
                    </SettingsProvider>
                  </RunProvider>
                </PrettierProvider>
              </VizProvider>
            </EditorModulesProvider>
          </ConnectionProvider>
        </WarningProvider>
      </RealtimeModulesProvider>
    </VizPageDataProvider>
  </URLStateProvider>
);
