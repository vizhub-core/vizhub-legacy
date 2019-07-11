import React, { useContext } from 'react';
import { withTheme } from 'styled-components';
import { LogoSVG } from '../svg';
import { AuthContext, AUTH_PENDING } from '../authentication';
import { Banner } from '../styles';
import { SignIn } from './styles';
import { UserActionsMenu } from './UserActionsMenu';

export const NavBar = withTheme(({ theme }) => {
  const { me, signIn } = useContext(AuthContext);
  console.log(theme.navbarLogoColor);
  return (
    <Banner>
      <LogoSVG height={theme.navbarLogoHeight} fill={theme.navbarLogoColor} />
      {me === AUTH_PENDING ? null : me ? (
        <UserActionsMenu />
      ) : (
        <SignIn className="test-sign-in" onClick={signIn}>
          Sign up / Sign in
        </SignIn>
      )}
    </Banner>
  );
});
