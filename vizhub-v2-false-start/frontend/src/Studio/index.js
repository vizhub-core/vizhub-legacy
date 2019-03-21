import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { URLStateContext } from '../urlState';
import { light } from '../themes';
import {
  StudioWrapper,
  ConfiguratorWrapper,
  EditorWrapper,
  ViewerWrapper
} from './styles';
import { Configurator } from './Configurator';
import { Editor } from './Editor';
import { Viewer } from './Viewer';
import { useEditorTheme } from './useEditorTheme';

export const Studio = () => {
  const { showConfigurator, file } = useContext(URLStateContext);
  const editorTheme = useEditorTheme();

  return (
    <StudioWrapper showConfigurator={showConfigurator} showEditor={file}>
      <ThemeProvider theme={editorTheme}>
        <>
          {showConfigurator ? (
            <ConfiguratorWrapper>
              <Configurator preloadFontFamily={editorTheme.font.family} />
            </ConfiguratorWrapper>
          ) : null}
          {file ? (
            <EditorWrapper>
              <Editor />
            </EditorWrapper>
          ) : null}
        </>
      </ThemeProvider>
      <ThemeProvider theme={light}>
        <ViewerWrapper>
          <Viewer />
        </ViewerWrapper>
      </ThemeProvider>
    </StudioWrapper>
  );
};
