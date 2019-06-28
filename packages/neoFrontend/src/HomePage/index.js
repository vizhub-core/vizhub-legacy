import React, { useContext } from 'react';
import { Wrapper, Content, Banner } from '../styles';
import { SignIn } from './styles';
import { LogoSVG } from '../svg';
import { AuthContext, AUTH_PENDING } from '../authentication';

export const HomePage = () => {
  const { me, signIn, signOut } = useContext(AuthContext);

  return (
    <Wrapper>
      <Content>
        <Banner>
          <LogoSVG height={40} fill="currentcolor" />
          {me === AUTH_PENDING ? null : me ? (
            <div onClick={signOut}>sign out</div>
          ) : (
            <SignIn onClick={signIn}>Sign up / Sign in</SignIn>
          )}
        </Banner>
      </Content>
    </Wrapper>
  );
};
