import React, { useContext, useState } from 'react';
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
  const [selectedTheme, setSelectedTheme] = useState('ubuntu');

  const selectedFontFamily = 'Ubuntu Mono';
  const selectedFontSize = '24pt';
  const selectedLigatures = 'None'; // can be 'None', 'Arrows', or 'All'

  const font = {
    family:
      selectedFontFamily +
      (selectedLigatures === 'All' ? ' Ligaturized' : ' Arrowized'),
    size: selectedFontSize
  };

  console.log(font);

  return (
    <StudioWrapper showConfigurator={showConfigurator} showEditor={file}>
      <ThemeProvider theme={Object.assign(themes[selectedTheme], { font })}>
        <>
          {showConfigurator ? (
            <ConfiguratorWrapper>
              <Configurator
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
              />
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
