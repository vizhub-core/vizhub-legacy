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

    <Section
      title="Design"
      id="design"
      visibleSections={visibleSections}
      onToggle={onSectionToggle}
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

    <Section
      title="Code"
      id="code"
      visibleSections={visibleSections}
      onToggle={onSectionToggle}
    >
      {files.map(file => (
        <File key={file} onClick={() => onFileClick(file)}>
          {file}
        </File>
      ))}
    </Section>
  </Wrapper>
);
