import React from 'react';
import { LogoSVG } from '../../../svg';
import { Padded } from '../styles';
import { avatarUrl } from '../avatarUrl';
import { Wrapper, Logo, HeaderAvatar } from './styles';

export const Header = ({ authenticatedUserData, height }) => (
  <Padded>
    <Wrapper>
      <Logo>
        <LogoSVG />
      </Logo>
      <HeaderAvatar src={avatarUrl(authenticatedUserData, height)} />
    </Wrapper>
  </Padded>
);
