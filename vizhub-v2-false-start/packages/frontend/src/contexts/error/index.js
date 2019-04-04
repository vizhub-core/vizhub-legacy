import React, { createContext, useState } from 'react';

export const ErrorContext = createContext();

export const ErrorProvider = ({ errorPage, children }) => {
  // Error objects are expected to have the following fields:
  //  - statusCode (optional) - for API requests, e.g. 404, 500
  //  - title - the title to display for the error
  //  - message - a longer description of the error
  const [error, setError] = useState();

  return error ? (
    errorPage(error)
  ) : (
    <ErrorContext.Provider value={setError}>{children}</ErrorContext.Provider>
  );
};
