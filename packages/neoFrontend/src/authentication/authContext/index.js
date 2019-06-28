import React, { createContext, useEffect, useState } from 'react';
import { fetchMe } from './fetchMe';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [me, setMe] = useState();

  useEffect(() => {
    fetchMe().then(setMe);
  }, []);

  return (
    <AuthContext.Provider value={{ me, setMe }}>
      {children}
    </AuthContext.Provider>
  );
};
