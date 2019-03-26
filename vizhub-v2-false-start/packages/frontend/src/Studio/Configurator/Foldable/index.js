import React from 'react';
import { ArrowRightSVG, ArrowDownSVG } from '../../../icons';
import { Wrapper, Header, HeaderIcon, HeaderTitle, Body } from './styles';

export const Foldable = ({ onClick, isActive, title, children, mono }) => (
  <Wrapper>
    <Header onClick={onClick} mono={mono}>
      <HeaderIcon>{isActive ? <ArrowDownSVG /> : <ArrowRightSVG />}</HeaderIcon>
      <HeaderTitle>{title}</HeaderTitle>
    </Header>
    {isActive ? <Body>{children}</Body> : null}
  </Wrapper>
);
