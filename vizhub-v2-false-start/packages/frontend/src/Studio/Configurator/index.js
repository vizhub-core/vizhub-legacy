import React, { useContext } from 'react';
import { URLStateContext } from '../urlState';
import { ArrowBackSVG } from '../../icons';
import { PreferencesContext } from '../../preferences';
import {
  Wrapper,
  File,
  Item,
  ItemIcon,
  Header,
  HeaderIcon,
  HeaderTitle,
  Widget,
  WidgetTitle,
  WidgetValue
} from './styles';
import { CheckBoxSVG } from '../../icons';
import { useCodeMirrorDynamicImport } from '../Editor/CodeMirror/useCodeMirrorDynamicImport';
import { Section } from './Section';
import { usePreloadFont } from './usePreloadFont';
import { Menu } from './Menu';

const files = ['index.html', 'index.js', 'styles.css'];

export const Configurator = ({ preloadFontFamily }) => {
  const { activeFile, selectFile, toggleConfigurator } = useContext(
    URLStateContext
  );

  const {
    colorTheme,
    colorThemeOptions,
    setColorTheme,

    font,
    fontOptions,
    setFont,

    ligatures,
    ligaturesOptions,
    setLigatures
  } = useContext(PreferencesContext);

  // Preload code font and CodeMirror JS,
  // so the user doesn't need to wait for these to load when they open a file.
  usePreloadFont(preloadFontFamily);
  useCodeMirrorDynamicImport();

  return (
    <Wrapper>
      <Header onClick={toggleConfigurator}>
        <HeaderIcon>
          <ArrowBackSVG fill={'white'} />
        </HeaderIcon>
        <HeaderTitle>Configurator</HeaderTitle>
      </Header>

      <Section title="State" id="state">
        <Widget>
          <WidgetTitle>Color</WidgetTitle>
          <WidgetValue fill="#e66465" />
        </Widget>
        <Widget isLast={true}>
          <WidgetTitle>Color</WidgetTitle>
          <WidgetValue fill="#e66465" />
        </Widget>
      </Section>

      <Section title="Files" id="files">
        {files.map(file => (
          <File
            key={file}
            onClick={selectFile(file)}
            isActive={file === activeFile}
          >
            {file}
          </File>
        ))}
      </Section>

      <Section title="Settings" id="settings">
        <Item>Auto-resize</Item>
        <Item>Height</Item>
        <Item>Background color</Item>
        <Item>Privacy</Item>
        <Item>Collaborators</Item>
      </Section>

      <Section title="Preferences" id="preferences">
        <Menu
          title="Color Theme"
          options={colorThemeOptions}
          activeOption={colorTheme}
          setActiveOption={setColorTheme}
        />
        <Menu
          title="Font"
          options={fontOptions}
          activeOption={font}
          setActiveOption={setFont}
        />
        <Menu
          title="Ligatures"
          options={ligaturesOptions}
          activeOption={ligatures}
          setActiveOption={setLigatures}
        />
        <Item>Font Size</Item>
        <Item>
          <ItemIcon>
            <CheckBoxSVG checked={true} />
          </ItemIcon>
          Grayscale
        </Item>
        <Item>
          <ItemIcon>
            <CheckBoxSVG checked={true} />
          </ItemIcon>
          Auto run
        </Item>
        <Item>
          <ItemIcon>
            <CheckBoxSVG checked={true} />
          </ItemIcon>
          Auto format
        </Item>
        <Item>
          <ItemIcon>
            <CheckBoxSVG checked={true} />
          </ItemIcon>
          Vim mode
        </Item>
      </Section>
    </Wrapper>
  );
};
