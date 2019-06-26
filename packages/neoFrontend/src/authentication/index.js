import React, { createContext } from 'react';
import { signIn } from './signIn';

// This context allows components to trigger the sign in flow.
export const AuthContext = createContext();

const auth = { signIn };

export const AuthContextProvider = ({ children }) => (
  <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
);
