import React, { createContext, useEffect, useState, useCallback } from 'react';
import { fetchMe } from './fetchMe';
import { AUTH_PENDING } from '../constants';
import { signInFlow } from '../signInFlow';
import { signOutFlow } from '../signOutFlow';

export const AuthContext = createContext();

let fetchMeCount = 0;

export const AuthProvider = ({ children }) => {
  // The value of `me` can be:
  //  - AUTH_PENDING - Not yet ascertained whether user is authenticated or not.
  //  - null - Not authenticated.
  //  - User object - Authenticated.
  const [me, setMe] = useState(AUTH_PENDING);

  // Fetch the currently authenticated user on page load.
  useEffect(() => {
    // Enforce assumption of single AuthProvider.
    if (fetchMeCount > 0) {
      throw new Error(
        'There should only ever be a single instance of AuthProvider.'
      );
    }
    fetchMeCount++;

    // Avoid React errors in case of error race condition.
    // See https://juliangaramendy.dev/use-promise-subscription/
    let subscribed = true;

    fetchMe().then((me) => {
      if (subscribed) {
        setMe(me);
      }
    });

    return () => (subscribed = false);
  }, []);

  // TODO: How to upgrade this to pass scope?
  // This works hardcoded:
  //signIn: useCallback(signInFlow(setMe, ['repo']), [setMe]),
  const contextValue = {
    me,
    signIn: useCallback(signInFlow(setMe), [setMe]),
    signOut: useCallback(signOutFlow(setMe), [setMe]),
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
