import React, { useContext } from 'react';
import { URLStateContext } from '../../urlState';
import { ArrowBackSVG } from '../../icons';
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
import { usePreloadCodeFont } from './usePreloadCodeFont';
import { Menu } from './Menu';

const files = ['index.html', 'index.js', 'styles.css'];

const themeOptions = [
  { title: 'Ubuntu', id: 'ubuntu' },
  { title: 'One Dark', id: 'oneDark' }
];

const fontOptions = [
  { title: 'Ubuntu Mono', id: 'ubuntuMono' },
  { title: 'Fira Code', id: 'firaCode' }
];

const selectedFont = 'ubuntuMono';
const setSelectedFont = () => {};

export const Configurator = ({ selectedTheme, setSelectedTheme }) => {
  const { file: activeFile, selectFile, toggleConfigurator } = useContext(
    URLStateContext
  );

  // Preload code font and CodeMirror JS,
  // so the user doesn't need to wait for these to load when they open a file.
  usePreloadCodeFont();
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
          options={themeOptions}
          activeOption={selectedTheme}
          setActiveOption={setSelectedTheme}
        />
        <Menu
          title="Font Family"
          options={fontOptions}
          activeOption={selectedFont}
          setActiveOption={setSelectedFont}
        />
        <Item>Font Size</Item>
        <Item>Ligatures</Item>
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
