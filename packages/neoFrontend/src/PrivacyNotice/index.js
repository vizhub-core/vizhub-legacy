import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Wrapper, Label } from './styles';
import { LockSVG } from '../svg';

export const PrivacyNotice = ({ className, owner }) => {
  const LinkComponent = useCallback(
    ({ children }) => <Wrapper className={className}>{children}</Wrapper>,
    [className]
  );

  return (
    <Link to={`/${owner.userName}?section=private`} component={LinkComponent}>
      <Label>PRIVATE</Label>
      <LockSVG height={20} fill="white" />
    </Link>
  );
};
