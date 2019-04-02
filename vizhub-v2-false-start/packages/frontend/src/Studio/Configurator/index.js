import React, { useContext } from 'react';
import { ArrowBackSVG } from '../../icons';
import {
  PreferencesContext,
  StudioDataContext,
  URLStateContext
} from '../../contexts';
import { FileTree } from './FileTree';
import {
  Wrapper,
  Item,
  ItemIcon,
  Header,
  HeaderIcon,
  HeaderTitle,
  Body,
  Widget,
  WidgetTitle,
  WidgetValue
} from './styles';
import { CheckBoxSVG } from '../../icons';
import { useCodeMirrorDynamicImport } from '../Editor/useCodeMirrorDynamicImport';
import { Section } from './Section';
import { usePreloadFont } from './usePreloadFont';
import { RadioMenu } from './RadioMenu';
import { getFileTree } from './getFileTree';

export const Configurator = ({ preloadFontFamily }) => {
  const { activeFileId, selectFile, toggleConfigurator } = useContext(
    URLStateContext
  );
  const { vizData } = useContext(StudioDataContext);
  const fileTree = getFileTree(vizData);

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
      <Body>
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
          {fileTree.children.map(child => (
            <FileTree
              key={child.name}
              node={child}
              activeFileId={activeFileId}
              selectFile={selectFile}
            />
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
          <RadioMenu
            title="Color Theme"
            options={colorThemeOptions}
            activeOption={colorTheme}
            setActiveOption={setColorTheme}
          />
          <RadioMenu
            title="Font"
            options={fontOptions}
            activeOption={font}
            setActiveOption={setFont}
          />
          <RadioMenu
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
      </Body>
    </Wrapper>
  );
};
