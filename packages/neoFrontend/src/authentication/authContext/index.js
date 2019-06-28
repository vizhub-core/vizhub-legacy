import React, { createContext, useEffect, useState, useCallback } from 'react';
import { fetchMe } from './fetchMe';
import { AUTH_PENDING } from '../constants';
import { signInFlow } from '../signInFlow';

export const AuthContext = createContext();

let fetchMeCount = 0;

export const AuthContextProvider = ({ children }) => {
  // The value of `me` can be:
  //  - AUTH_PENDING - Not yet ascertained whether user is authenticated or not.
  //  - null - Not authenticated.
  //  - User object - Authenticated.
  const [me, setMe] = useState(AUTH_PENDING);

  // Fetch the currently authenticated user once, on page load.
  useEffect(() => {
    // Enforce assumption of single AuthContextProvider.
    if (fetchMeCount > 0) {
      throw new Error(
        'There should only ever be a single instance of AuthContextProvider'
      );
    }
    fetchMeCount++;

    // TODO handle non-authenticated case.
    fetchMe().then(setMe);
  }, []);

  const signIn = useCallback(signInFlow(setMe), [setMe]);

  // TODO sign out flow
  const signOut = () => setMe(null);

  const contextValue = { me, signIn, signOut };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
