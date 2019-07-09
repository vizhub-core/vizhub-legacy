import React, { useContext } from 'react';
import { LogoSVG } from '../svg';
import { AuthContext, AUTH_PENDING } from '../authentication';
import { Banner } from '../styles';
import { SignIn } from './styles';
import { UserActionsMenu } from './UserActionsMenu';

export const NavBar = () => {
  const { me, signIn } = useContext(AuthContext);
  return (
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
  );
};
