import React from 'react';
import { LogoSVG } from '../svg';
import { LoadingScreenWrapper, SpinningLogo, Message } from './styles';

export const LoadingScreen = ({ message }) => (
  <LoadingScreenWrapper>
    <SpinningLogo>
      <LogoSVG />
    </SpinningLogo>
    {message ? <Message>{message}</Message> : null}
  </LoadingScreenWrapper>
);
