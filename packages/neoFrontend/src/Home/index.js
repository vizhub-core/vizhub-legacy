import React from 'react';
import { Wrapper, Content, Banner, SignIn, Logo } from './styles';
import { LogoSVG } from '../svg/LogoSVG';

export const Home = () => (
  <Wrapper>
    <Content>
      <Banner>
        <Logo height={40}>
          <LogoSVG fill='currentcolor'/>
        </Logo>
        <SignIn>Sign up / Sign in</SignIn>
      </Banner>
    </Content>
  </Wrapper>
);
