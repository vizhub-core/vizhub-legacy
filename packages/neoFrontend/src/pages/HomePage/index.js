import React, { useContext } from 'react';
import { LogoSVG } from '../../svg';
import { AuthContext, AUTH_PENDING } from '../../authentication';
import { LoadingScreen } from '../../LoadingScreen';
import { Wrapper, Content, Banner } from '../styles';
import { SignIn, Avatar } from './styles';
import { HomePageDataProvider } from './HomePageData';

// Use 's=180' because that's what GitHub uses all over the place
// for small avatars, so they are more likely to be cached.
const avatarUrl = user => user.avatarUrl + '&s=180';

export const HomePage = () => {
  const { me, signIn, signOut } = useContext(AuthContext);
  return (
    <HomePageDataProvider fallback={<LoadingScreen />}>
      <Wrapper>
        <Content>
          <Banner>
            <LogoSVG height={40} fill="currentcolor" />
            {me === AUTH_PENDING ? null : me ? (
              <Avatar
                className="test-avatar-me"
                src={avatarUrl(me)}
                alt={me.userName}
                onClick={signOut}
              />
            ) : (
              <SignIn className="test-sign-in" onClick={signIn}>
                Sign up / Sign in
              </SignIn>
            )}
          </Banner>
        </Content>
      </Wrapper>
    </HomePageDataProvider>
  );
};
