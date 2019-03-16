import React, { useContext } from 'react';
import { URLStateContext } from '../../urlState';
import { ArrowBackSVG } from '../../icons';
import {
  Wrapper,
  File,
  Item,
  Header,
  HeaderIcon,
  HeaderTitle,
  Widget,
  WidgetTitle,
  WidgetValue
} from './styles';
import { Section } from './Section';
import { usePreloadCodeFont } from './usePreloadCodeFont';
import { useCodeMirrorDynamicImport } from '../Editor/CodeMirror/useCodeMirrorDynamicImport';
import { Menu } from './Menu';

const files = ['index.html', 'index.js', 'styles.css'];

const themeOptions = [
  { title: 'Ubuntu', id: 'ubuntu' },
  { title: 'One Dark', id: 'one-dark' }
];

export const Configurator = () => {
  const { selectFile, toggleConfigurator } = useContext(URLStateContext);

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
          <File key={file} onClick={selectFile(file)}>
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
        <Menu title="Color Theme" options={themeOptions} />
        <Item>Grayscale</Item>
        <Item>Auto run</Item>
        <Item>Auto format</Item>
        <Item>Vim mode</Item>
        <Item>Theme</Item>
        <Item>Font family</Item>
        <Item>Font size</Item>
        <Item>Ligatures</Item>
      </Section>
    </Wrapper>
  );
};
