import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { URLStateContext } from './urlState';
import { StudioDataContext } from './StudioDataContext';
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

export const StudioBody = () => {
  const { showConfigurator, activeFileId } = useContext(URLStateContext);
  const { vizData } = useContext(StudioDataContext);
  const editorTheme = useEditorTheme();
  return (
    <StudioWrapper
      showConfigurator={showConfigurator}
      showEditor={activeFileId}
    >
      <ThemeProvider theme={editorTheme}>
        <>
          {showConfigurator ? (
            <ConfiguratorWrapper>
              <Configurator preloadFontFamily={editorTheme.font.family} />
            </ConfiguratorWrapper>
          ) : null}
          {activeFileId ? (
            <EditorWrapper>
              <Editor activeFileId={activeFileId} vizData={vizData} />
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
