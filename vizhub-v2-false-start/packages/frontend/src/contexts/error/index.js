import React, { createContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { VizHubError } from 'vizhub-common';

// This context allows children components to report errors.
// For example, a 404 error is reported if the studioData API call fails.
export const ErrorContext = createContext();

// If an error has not yet been reported, children are rendered,
// and can use ErrorContext to report errors.
//
// If an error has been reported, the whole page "errors out" and
// the given errorPage is displayed.
export const ErrorProvider = withRouter(({ errorPage, children, history }) => {
  const [error, setError] = useState();

  // error is expected to be an instance of VizHubError.
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
