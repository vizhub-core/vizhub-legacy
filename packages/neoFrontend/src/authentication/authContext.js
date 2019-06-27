import React, { createContext, useEffect } from 'react';
import { signIn } from './signIn';

// This context allows components to trigger the sign in flow.
export const AuthContext = createContext();

const auth = { signIn };

export const AuthContextProvider = ({ children }) => {
  useEffect(() => {
    fetch('/api/auth/me', { method: 'GET', credentials: 'same-origin' })
      .then(response => response.json())
      .then(data => {
        // TODO expose this to context
        console.log('response from auth/me:');
        console.log(data);
      });
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
