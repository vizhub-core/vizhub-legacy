import fetch from 'node-fetch';
import { VizHubAPIError } from 'vizhub-entities';

const oAuthAccessTokenURL = 'https://github.com/login/oauth/access_token';
const client_id = process.env.REACT_APP_VIZHUB_GITHUB_CLIENT_ID;
const client_secret = process.env.REACT_APP_VIZHUB_GITHUB_CLIENT_SECRET;

// Get an access token from GitHub's API.
export const getAccessToken = async code => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ client_id, client_secret, code })
  };

  const response = await fetch(oAuthAccessTokenURL, fetchOptions);
  const data = await response.json();
  if (data.error) {
    if (data.error === 'Not Found') {
      console.log(
        'Check that you have your GitHub OAuth environment variables set'
      );
    }
    throw new VizHubAPIError({
      error: data.error,
      errorDescription: data.error_description || data.error,
      errorURL: data.error_uri
    });
  }

  return data.access_token;
};
