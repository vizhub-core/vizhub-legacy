import React, { createContext, useState } from 'react';

export const ErrorContext = createContext();

export const ErrorProvider = ({ children, fallback }) => {
  const [error, setError] = useState();
  const contextValue = { setError };

  return error ? (
    fallback(error)
  ) : (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
};
