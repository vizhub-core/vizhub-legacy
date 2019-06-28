import React, { useContext } from 'react';
import { Wrapper, Content, Banner, SignIn } from './styles';
import { LogoSVG } from '../svg';
import { AuthContext, signIn, AUTH_PENDING } from '../authentication';

export const HomePage = () => {
  const { me, setMe } = useContext(AuthContext);

  return (
    <Wrapper>
      <Content>
        <Banner>
          <LogoSVG height={40} fill="currentcolor" />
          {me === AUTH_PENDING ? null : me ? (
            <div onClick={() => setMe()}>sign out</div>
          ) : (
            <SignIn onClick={signIn(setMe)}>Sign up / Sign in</SignIn>
          )}
        </Banner>
      </Content>
    </Wrapper>
  );
};
