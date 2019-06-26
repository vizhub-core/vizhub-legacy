import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Success, Error } from './styles';

// This page will open within the authentication popup,
// triggered by the OAuth callback URL, which should be set to
// `${serverURL}/authenticated`.
//
// When invoked via OAuth, it will have a code attached, like this:
//
// `${serverURL}/authenticated?code=fff33d3da4333abdr4fe`.
//
export const AuthPopupPage = () => {
  // Get the code passed from OAuth out of the URL.
  const { code } = queryString.parse(window.location.search);

  const [errorResponse, setErrorResponse] = useState();
  const [successResponse, setSuccessResponse] = useState();

  // Get the JWT token from backend API.
  useEffect(() => {
    fetch('/api/auth/github', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setErrorResponse(data);
        } else {
          setSuccessResponse(true);
          console.log(data.token);

          // TODO Pass the code from this popup to the parent page (opener).
          //window.opener.postMessage({ vizHubJWT }, window.opener.location);
        }
      });
  }, [code]);

  // Render a success message.
  return successResponse ? (
    <Success>Success!</Success>
  ) : errorResponse ? (
    <Error>{errorResponse.errorDescription}</Error>
  ) : null;
};
