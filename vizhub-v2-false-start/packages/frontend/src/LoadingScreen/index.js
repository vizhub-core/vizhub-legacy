import React from 'react';
import { LogoSVG } from '../svg';
import { LoadingScreenWrapper, SpinningLogo } from './styles';

export const LoadingScreen = () => (
  <LoadingScreenWrapper>
    <SpinningLogo>
      <LogoSVG />
    </SpinningLogo>
  </LoadingScreenWrapper>
);
