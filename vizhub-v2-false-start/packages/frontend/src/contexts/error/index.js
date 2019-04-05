import React, { createContext, useState } from 'react';
import { VizHubError } from './VizHubError';

export const ErrorContext = createContext();

export const ErrorProvider = ({ errorPage, children }) => {
  const [error, setError] = useState();

  if (!error instanceof VizHubError) throw Error();

  return error ? (
    errorPage(error)
  ) : (
    <ErrorContext.Provider value={setError}>{children}</ErrorContext.Provider>
  );
};

export { VizHubError };
