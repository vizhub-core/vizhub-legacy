import React from 'react';
import logo from '../svg/logo.svg';
import { LoadingScreenWrapper, SpinningImage } from './styles';

export const LoadingScreen = () => (
  <LoadingScreenWrapper>
    <SpinningImage src={logo} />
  </LoadingScreenWrapper>
);
