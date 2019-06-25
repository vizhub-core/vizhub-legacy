import React from 'react';
import { Wrapper, Content, Banner, SignIn } from './styles';

export const Home = () => (
  <Wrapper>
    <Content>
      <Banner>
        <div>VizHub</div>
        <SignIn>Sign up / Sign in</SignIn>
      </Banner>
    </Content>
  </Wrapper>
);
