import fetch from 'node-fetch';
import { ErrorResponse } from '../ErrorResponse';

const oAuthAccessTokenURL = 'https://github.com/login/oauth/access_token';
const client_id = process.env.REACT_APP_VIZHUB_GITHUB_CLIENT_ID;
const client_secret = process.env.REACT_APP_VIZHUB_GITHUB_CLIENT_SECRET;

// Get an access token from GitHub's API.
export const getAccessToken = code => {
  // Assemble options for fetch request.
  const fetchOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ client_id, client_secret, code })
  };

  // Execute the fetch request.
  return fetch(oAuthAccessTokenURL, fetchOptions)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        return Promise.reject(
          ErrorResponse({
            error: data.error,
            errorDescription: data.error_description,
            errorURL: data.error_uri
          })
        );
      }
      console.log('data');
      console.log(data);
      return data.access_token;
    });
};
