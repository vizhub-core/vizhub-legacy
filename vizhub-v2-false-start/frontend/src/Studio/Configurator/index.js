import React from 'react';
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
import { ArrowBackSVG } from '../../icons';
import { Section } from './Section';

const files = ['index.html', 'index.js', 'styles.css'];

const DesignSection = ({ onToggle, visibleSections }) => (
  <Section
    id="design"
    title="Design"
    visibleSections={visibleSections}
    onToggle={onToggle}
  >
    <Widget>
      <WidgetTitle>Color</WidgetTitle>
      <WidgetValue fill="#e66465" />
    </Widget>
    <Widget isLast={true}>
      <WidgetTitle>Color</WidgetTitle>
      <WidgetValue fill="#e66465" />
    </Widget>
  </Section>
);

const CodeSection = ({ onToggle, files, onFileClick, visibleSections }) => (
  <Section title="Code" visibleSections={visibleSections} onToggle={onToggle}>
    {files.map(file => (
      <File key={file} onClick={() => onFileClick(file)}>
        {file}
      </File>
    ))}
  </Section>
);

export const Configurator = ({
  onCloseClick,
  onFileClick,
  onSectionToggle,
  visibleSections
}) => (
  <Wrapper>
    <Header onClick={onCloseClick}>
      <HeaderIcon>
        <ArrowBackSVG fill={'white'} />
      </HeaderIcon>
      <HeaderTitle>Configurator</HeaderTitle>
    </Header>
    <DesignSection
      onToggle={onSectionToggle}
      visibleSections={visibleSections}
    />
    <CodeSection
      onToggle={onSectionToggle}
      files={files}
      onFileClick={onFileClick}
      visibleSections={visibleSections}
    />
    {
      //  <Section title="Settings" />
    }
  </Wrapper>
);
