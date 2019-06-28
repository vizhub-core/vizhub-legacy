import React, { createContext, useEffect, useState } from 'react';
import { fetchMe } from './fetchMe';
import { AUTH_PENDING } from '../constants';

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

  return (
    <AuthContext.Provider value={{ me, setMe }}>
      {children}
    </AuthContext.Provider>
  );
};
