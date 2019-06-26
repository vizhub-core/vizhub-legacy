import React from 'react';
import { Wrapper, Content, Banner, SignIn } from './styles';
import { LogoSVG } from '../../svg';

export const Home = () => {
  const signIn = () => {
    console.log('sign in');
  };

  return (
    <Wrapper>
      <Content>
        <Banner>
          <LogoSVG height={40} fill="currentcolor" />
          <SignIn onClick={signIn}>Sign up / Sign in</SignIn>
        </Banner>
      </Content>
    </Wrapper>
  );
};
