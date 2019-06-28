import React, { useContext } from 'react';
import { Wrapper, Content, Banner, SignIn } from './styles';
import { LogoSVG } from '../svg';
import { AuthContext } from '../authentication';

export const HomePage = () => {
  const { signIn, me, setMe } = useContext(AuthContext);

  return (
    <Wrapper>
      <Content>
        <Banner>
          <LogoSVG height={40} fill="currentcolor" />
          {me ? (
            <div onClick={() => setMe()}>sign out</div>
          ) : (
            <SignIn onClick={signIn(setMe)}>Sign up / Sign in</SignIn>
          )}
        </Banner>
      </Content>
    </Wrapper>
  );
};
