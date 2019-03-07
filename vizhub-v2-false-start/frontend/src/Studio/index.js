import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  StudioWrapper,
  ConfiguratorWrapper,
  EditorWrapper,
  ViewerWrapper
} from './styles';
import { Configurator } from './Configurator';
import { Editor } from './Editor';
import { Viewer } from './Viewer';
import { dark, light } from '../themes';
import { visibleSections } from './visibleSections';

export const Studio = ({
  showConfigurator,
  onConfiguratorClose,
  onConfiguratorSectionToggle,
  showEditor,
  onEditClick,
  onFileClick
}) => (
  <StudioWrapper showConfigurator={showConfigurator} showEditor={showEditor}>
    <ThemeProvider theme={dark}>
      <>
        {showConfigurator ? (
          <ConfiguratorWrapper>
            <Configurator
              onCloseClick={onConfiguratorClose}
              onFileClick={onFileClick}
              onSectionToggle={onConfiguratorSectionToggle}
              visibleSections={visibleSections(showConfigurator)}
            />
          </ConfiguratorWrapper>
        ) : null}
        {showEditor ? (
          <EditorWrapper>
            <Editor />
          </EditorWrapper>
        ) : null}
      </>
    </ThemeProvider>
    <ThemeProvider theme={light}>
      <ViewerWrapper>
        <Viewer onEditClick={onEditClick} />
      </ViewerWrapper>
    </ThemeProvider>
  </StudioWrapper>
);
