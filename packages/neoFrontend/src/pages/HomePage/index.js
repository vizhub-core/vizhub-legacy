import React, { useContext } from 'react';
import { LogoSVG } from '../../svg';
import { AuthContext, AUTH_PENDING } from '../../authentication';
import { LoadingScreen } from '../../LoadingScreen';
import { Wrapper, Content, Banner } from '../styles';
import { SignIn, Avatar } from './styles';
import { HomePageDataProvider } from './HomePageData';

export const HomePage = () => {
  const { me, signIn, signOut } = useContext(AuthContext);

  return (
    <HomePageDataProvider fallback={<LoadingScreen />}>
      <Wrapper>
        <Content>
          <Banner>
            <LogoSVG height={40} fill="currentcolor" />
            {me === AUTH_PENDING ? null : me ? (
              <Avatar src={me.avatarUrl + '&s=180'} onClick={signOut} />
            ) : (
              <SignIn className='test-sign-in' onClick={signIn}>Sign up / Sign in</SignIn>
            )}
          </Banner>
        </Content>
      </Wrapper>
    </HomePageDataProvider>
  );
};
