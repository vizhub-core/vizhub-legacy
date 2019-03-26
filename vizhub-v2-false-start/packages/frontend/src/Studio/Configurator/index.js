import React, { useContext } from 'react';
import { ascending } from 'd3-array';
import { URLStateContext } from '../urlState';
import { StudioDataContext } from '../StudioDataContext';
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
import { useCodeMirrorDynamicImport } from '../Editor/useCodeMirrorDynamicImport';
import { Section } from './Section';
import { usePreloadFont } from './usePreloadFont';
import { Menu } from './Menu';

const getFileEntries = vizData =>
  Object.entries(vizData.working.files)
    .map(([id, { path, text }]) => ({
      id,
      path,
      text
    }))
    .sort((a, b) => ascending(a.path, b.path));

const getFileTree = fileEntries => {
  const fileTree = {};
  fileEntries.forEach(fileEntry => {
    const pathArray = fileEntry.path.split('/');
    const n = pathArray.length;
    let node = fileTree;
    for (let i = 0; i < n; i++) {
      const pathItem = pathArray[i];
      node = node[pathItem] || (node[pathItem] = i < n - 1 ? {} : fileEntry);
    }
  });
  return fileTree;
};

export const Configurator = ({ preloadFontFamily }) => {
  const { activeFileId, selectFile, toggleConfigurator } = useContext(
    URLStateContext
  );
  const { vizData } = useContext(StudioDataContext);
  const fileEntries = getFileEntries(vizData);
  const fileTree = getFileTree(fileEntries);
  console.log(fileTree);

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
        {fileEntries.map(({ id, path, text }) => (
          <File
            key={id}
            onClick={selectFile(id)}
            isActive={id === activeFileId}
          >
            {path}
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
