import React, { createContext, useEffect, useState } from 'react';

// This context allows components to trigger the sign in flow.
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [me, setMe] = useState();

  useEffect(() => {
    fetch('/api/auth/me', { method: 'GET', credentials: 'same-origin' })
      .then(response => response.json())
      .then(setMe);
  }, []);

  const auth = { me, setMe };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
