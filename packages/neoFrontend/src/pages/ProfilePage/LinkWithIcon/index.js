import React from 'react';
import { PeopleSVG, LockSVG } from '../../../svg';
import { Wrapper, LinkText } from './styles';

const svgs = { PeopleSVG, LockSVG };

export const LinkWithIcon = ({ onClick, icon, active, children }) => {
  const Icon = svgs[icon];
  return (
    <Wrapper active={active} onClick={onClick}>
      <Icon height={20} />
      <LinkText>{children}</LinkText>
    </Wrapper>
  );
};
