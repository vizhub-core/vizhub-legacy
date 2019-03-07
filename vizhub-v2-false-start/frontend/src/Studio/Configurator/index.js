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

const files = ['index.html', 'index.js', 'styles.css'];

export const Configurator = ({
  onFileClick,
  onSectionToggle,
  visibleSections
}) => {
  const { showConfigurator, setShowConfigurator } = useContext(URLStateContext);

  return (
    <Wrapper>
      <Header onClick={() => setShowConfigurator(false)}>
        <HeaderIcon>
          <ArrowBackSVG fill={'white'} />
        </HeaderIcon>
        <HeaderTitle>Configurator</HeaderTitle>
      </Header>

      <Section
        title="Design"
        id="design"
        showConfigurator={showConfigurator}
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
        showConfigurator={showConfigurator}
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
};
