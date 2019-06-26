import React from 'react';
import queryString from 'query-string';
import { Success } from './styles';

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

  // Get the JWT token from backend API.
  fetch('/api/auth/github', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: code
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);

      // TODO Pass the code from this popup to the parent page (opener).
      //window.opener.postMessage({ vizHubJWT }, window.opener.location);
    })
    .catch(error => {
      console.log(error);
    });

  // Render a success message.
  return <Success>Success!</Success>;
};
