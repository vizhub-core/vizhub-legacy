import React from 'react';
import * as svgs from '../../../svg';
import { Wrapper, Link, LinkText, Blank } from './styles';

export const LinkWithIcon = ({ onClick, icon, active, title, children }) => {
  const Icon = svgs[icon] || Blank;
  return (
    <Wrapper active={active}>
      <Link title={title} onClick={onClick}>
        <Icon height={20} />
        <LinkText>{children}</LinkText>
      </Link>
    </Wrapper>
  );
};
