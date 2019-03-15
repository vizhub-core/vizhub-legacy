import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import * as themes from '../themes';
import { URLStateContext } from '../urlState';
import {
  StudioWrapper,
  ConfiguratorWrapper,
  EditorWrapper,
  ViewerWrapper
} from './styles';
import { Configurator } from './Configurator';
import { Editor } from './Editor';
import { Viewer } from './Viewer';

export const Studio = () => {
  const { showConfigurator, file } = useContext(URLStateContext);

  // TODO make this configurable per user.
  const selectedTheme = 'ubuntu';

  return (
    <StudioWrapper showConfigurator={showConfigurator} showEditor={file}>
      <ThemeProvider theme={themes[selectedTheme]}>
        <>
          {showConfigurator ? (
            <ConfiguratorWrapper>
              <Configurator />
            </ConfiguratorWrapper>
          ) : null}
          {file ? (
            <EditorWrapper>
              <Editor />
            </EditorWrapper>
          ) : null}
        </>
      </ThemeProvider>
      <ThemeProvider theme={themes.light}>
        <ViewerWrapper>
          <Viewer />
        </ViewerWrapper>
      </ThemeProvider>
    </StudioWrapper>
  );
};
