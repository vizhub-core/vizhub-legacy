import React, { createContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { VizHubError } from './VizHubError';

export const ErrorContext = createContext();

export const ErrorProvider = withRouter(({ errorPage, children, history }) => {
  const [error, setError] = useState();

  if (!error instanceof VizHubError) throw Error();

  // Clear error on navigate (e.g. back button).
  useEffect(
    () =>
      history.listen(() => {
        setError(undefined);
      }),
    [history]
  );

  return error ? (
    errorPage(error)
  ) : (
    <ErrorContext.Provider value={setError}>{children}</ErrorContext.Provider>
  );
});

export { VizHubError };
