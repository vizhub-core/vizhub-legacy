import React from 'react';
import { LogoSVG } from '../svg';
import { LoadingScreenWrapper, SpinningLogo, Message } from './styles';
export { animationDelay } from './animationDelay';

export const LoadingScreen = ({ message }) => (
  <LoadingScreenWrapper>
    <SpinningLogo>
      <LogoSVG />
    </SpinningLogo>
    {message ? <Message>{message}</Message> : null}
  </LoadingScreenWrapper>
);
