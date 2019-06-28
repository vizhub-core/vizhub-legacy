import React from 'react';
import { Wrapper, Content, Banner } from './styles';
import { LogoSVG } from '../../svg';
import { oAuthURL } from '../constants';

export const AuthPage = () => {
  return (
    <Wrapper>
      <Content>
        <Banner>
          <LogoSVG height={40} fill="currentcolor" />
        </Banner>
        <a href={oAuthURL}>Sign in with GitHub</a>
      </Content>
    </Wrapper>
  );
};
