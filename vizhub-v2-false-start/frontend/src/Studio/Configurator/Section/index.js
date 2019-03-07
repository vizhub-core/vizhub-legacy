import React from 'react';
import { ArrowRightSVG, ArrowDownSVG } from '../../../icons';
import { Wrapper, Header, HeaderIcon, HeaderTitle, Body } from './styles';

export const Section = ({ id, title, children, visibleSections, onToggle }) => (
  <Wrapper>
    <Header onClick={() => onToggle(id)}>
      <HeaderIcon>
        {visibleSections[id] ? <ArrowDownSVG /> : <ArrowRightSVG />}
      </HeaderIcon>
      <HeaderTitle>{title}</HeaderTitle>
    </Header>
    {visibleSections[id] ? <Body>{children}</Body> : null}
  </Wrapper>
);
