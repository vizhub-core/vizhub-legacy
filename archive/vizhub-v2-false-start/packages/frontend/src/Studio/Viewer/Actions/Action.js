import React from 'react';
import { Wrapper, Icon } from './styles';

export const Action = ({ svg: SVG, onClick, children, desktopOnly }) => (
  <Wrapper onClick={onClick} desktopOnly={desktopOnly}>
    <Icon>
      <SVG />
    </Icon>
    {children}
  </Wrapper>
);
