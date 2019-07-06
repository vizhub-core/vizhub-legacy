import React, { createContext, useEffect, useState, useCallback } from 'react';
import { fetchMe } from './fetchMe';
import { AUTH_PENDING } from '../constants';
import { signInFlow } from '../signInFlow';
import { signOutFlow } from '../signOutFlow';

export const AuthContext = createContext();

let fetchMeCount = 0;

export const AuthContextProvider = ({ children }) => {
  // The value of `me` can be:
  //  - AUTH_PENDING - Not yet ascertained whether user is authenticated or not.
  //  - null - Not authenticated.
  //  - User object - Authenticated.
  const [me, setMe] = useState(AUTH_PENDING);

  // Fetch the currently authenticated user on page load.
  useEffect(() => {
    // Enforce assumption of single AuthContextProvider.
    if (fetchMeCount > 0) {
      throw new Error(
        'There should only ever be a single instance of AuthContextProvider.'
      );
    }
    fetchMeCount++;

    fetchMe().then(setMe);
  }, []);

  console.log(me);

  const contextValue = {
    me,
    signIn: useCallback(signInFlow(setMe), [setMe]),
    signOut: useCallback(signOutFlow(setMe), [setMe])
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
