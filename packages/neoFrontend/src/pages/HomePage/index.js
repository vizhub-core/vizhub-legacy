import React, { useContext } from 'react';
import { LogoSVG, SVGGallery } from '../../svg';
import { AuthContext, AUTH_PENDING } from '../../authentication';
import { LoadingScreen } from '../../LoadingScreen';
import { Wrapper, Content, Banner } from '../styles';
import { SignIn } from './styles';
import { HomePageDataProvider } from './HomePageDataContext';
import { UserActionsMenu } from './UserActionsMenu';

export const HomePage = () => {
  const { me, signIn } = useContext(AuthContext);
  return (
    <HomePageDataProvider fallback={<LoadingScreen />}>
      <Wrapper>
        <Content>
          <Banner>
            <LogoSVG height={40} fill="currentcolor" />
            {me === AUTH_PENDING ? null : me ? (
              <UserActionsMenu />
            ) : (
              <SignIn className="test-sign-in" onClick={signIn}>
                Sign up / Sign in
              </SignIn>
            )}
          </Banner>
          <SVGGallery />
        </Content>
      </Wrapper>
    </HomePageDataProvider>
  );
};
