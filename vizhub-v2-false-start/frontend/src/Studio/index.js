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
  const [colorTheme, setcolor] = useState('ubuntu');
  const [font, setFont] = useState('Inconsolata-g');
  const [ligatures, setLigatures] = useState('arrows');

  // TODO Ligature options
  //const selectedLigatures = 'None'; // can be 'None', 'Arrows', or 'All'

  // TODO optimize changing object using hooks
  // e. g. useEffect(() => {}, [colorTheme, font, ligatures])
  const theme = Object.assign({}, themes[colorTheme], {
    font: {
      family: font + (ligatures !== 'all' ? ' Arrowized' : ''),
      size: '18pt',
      ligatures: ligatures !== 'none'
    }
  });

  console.log(theme.font);

  return (
    <StudioWrapper showConfigurator={showConfigurator} showEditor={file}>
      <ThemeProvider theme={theme}>
        <>
          {showConfigurator ? (
            <ConfiguratorWrapper>
              <Configurator
                colorTheme={colorTheme}
                setcolor={setcolor}
                preloadFontFamily={theme.font.family}
                font={font}
                setFont={setFont}
                ligatures={ligatures}
                setLigatures={setLigatures}
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
