import React from 'react';
import { LoadingScreen } from '../../LoadingScreen';
import { useOpener } from './useOpener';
import { useTokenGetter } from './useTokenGetter';

// This page will open within the authentication popup,
// triggered by the OAuth callback URL, which should be set to
// `${serverURL}/authenticated`.
//
// When invoked via OAuth, it will have a code attached, like this:
//
// `${serverURL}/authenticated?code=fff33d3da4333abdr4fe`.

export const AuthPopupPage = () => {
  useOpener(useTokenGetter());
  return <LoadingScreen message="Signing in..." />;
};
