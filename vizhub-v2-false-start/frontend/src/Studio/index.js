import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import * as themes from '../themes';
import { URLStateContext } from '../urlState';
import { UserPreferencesContext } from '../userPreferences';
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

  const { colorTheme, font, ligatures } = useContext(UserPreferencesContext);

  // TODO optimize changing object using hooks
  // e. g. useEffect(() => {}, [colorTheme, font, ligatures])
  const theme = Object.assign({}, themes[colorTheme], {
    font: {
      family: font + (ligatures !== 'all' ? ' Arrowized' : ''),
      size: '16pt',
      ligatures: ligatures !== 'none'
    }
  });

  return (
    <StudioWrapper showConfigurator={showConfigurator} showEditor={file}>
      <ThemeProvider theme={theme}>
        <>
          {showConfigurator ? (
            <ConfiguratorWrapper>
              <Configurator preloadFontFamily={theme.font.family} />
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
