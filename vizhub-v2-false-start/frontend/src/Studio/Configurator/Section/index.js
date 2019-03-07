import React from 'react';
import { ArrowRightSVG, ArrowDownSVG } from '../../../icons';
import { Wrapper, Header, HeaderIcon, HeaderTitle, Body } from './styles';

export const Section = ({
  id,
  title,
  children,
  showConfigurator,
  onToggle
}) => {
  const isActive = id === showConfigurator;
  return (
    <Wrapper>
      <Header onClick={() => onToggle(id)}>
        <HeaderIcon>
          {isActive ? <ArrowDownSVG /> : <ArrowRightSVG />}
        </HeaderIcon>
        <HeaderTitle>{title}</HeaderTitle>
      </Header>
      {isActive ? <Body>{children}</Body> : null}
    </Wrapper>
  );
};
