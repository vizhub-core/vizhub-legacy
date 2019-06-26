import React, { useContext } from 'react';
import { Wrapper, Content, Banner, SignIn } from './styles';
import { LogoSVG } from '../../svg';
import { AuthContext } from '../../authentication';

export const Home = () => {
  const { signIn } = useContext(AuthContext);

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
