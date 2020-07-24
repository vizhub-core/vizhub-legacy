import React, { useState, useCallback } from 'react';
import * as svgs from '../../../svg';
import { Wrapper, Link, LinkText, Blank } from './styles';

export const LinkWithIcon = ({ onClick, icon, title, children }) => {
  const [isHovering, setIsHovering] = useState(false);
  const onMouseEnter = useCallback(() => setIsHovering(true), []);
  const onMouseLeave = useCallback(() => setIsHovering(false), []);
  const Icon = svgs[icon] || Blank;
  return (
    <Wrapper>
      <Link
        title={title}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Icon height={20}/>
        <LinkText>
          {children}
        </LinkText>
      </Link>
    </Wrapper>
  );
};

