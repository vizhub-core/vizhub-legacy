import React, { useContext } from 'react';
import { URLStateContext } from '../../urlState';
import { ArrowBackSVG } from '../../icons';
import {
  Wrapper,
  File,
  Header,
  HeaderIcon,
  HeaderTitle,
  Widget,
  WidgetTitle,
  WidgetValue
} from './styles';
import { Section } from './Section';
import { usePreloadCodeFont } from './usePreloadCodeFont';

const files = ['index.html', 'index.js', 'styles.css'];

export const Configurator = () => {
  const { selectFile, toggleConfigurator } = useContext(URLStateContext);

  // Preload code font so it's there when the user opens a file.
  usePreloadCodeFont();

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
        <div>Auto-resize</div>
        <div>Height</div>
        <div>Background color</div>
        <div>Privacy</div>
        <div>Collaborators</div>
      </Section>

      <Section title="Preferences" id="preferences">
        <div>Grayscale</div>
        <div>Auto run</div>
        <div>Auto format</div>
        <div>Vim mode</div>
        <div>Theme</div>
        <div>Font family</div>
        <div>Font size</div>
        <div>Ligatures</div>
      </Section>
    </Wrapper>
  );
};
