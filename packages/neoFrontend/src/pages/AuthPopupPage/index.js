import React, { useEffect, useContext } from 'react';
import queryString from 'query-string';
import { ErrorContext } from '../../ErrorContext';
import {
  getJWT,
  getJWTForGoogle,
  postMessageToOpener,
} from '../../authentication';
import { LoadingScreen } from '../../LoadingScreen';

// This page will open within the authentication popup,
// triggered by the OAuth callback URL, which should be set to
// `${serverURL}/authenticated`.
//
// When invoked via OAuth, it will have a code attached, like this:
//
// `${serverURL}/authenticated?code=fff33d3da4333abdr4fe`.
//
export const AuthPopupPage = () => {
  // console.log();
  // Get the code passed from OAuth out of the URL.
  const { code } = queryString.parse(window.location.search);
  const { id_token } = queryString.parse(window.location.hash);

  const { setError } = useContext(ErrorContext);

  // Get the JWT token from backend API.
  useEffect(() => {
    if (code) {
      getJWT(code).then((data) => {
        if (data.error) {
          setError(new Error(data.errorDescription));
        } else {
          postMessageToOpener(data);
        }
      });
    }
    if (id_token) {
      getJWTForGoogle(id_token).then((data) => {
        // console.log(data);
        if (data.error) {
          setError(new Error(data.errorDescription));
        } else {
          postMessageToOpener(data);
        }
      });
    }
  }, [code, id_token, setError]);

  return <LoadingScreen message="Signing in..." />;
};
