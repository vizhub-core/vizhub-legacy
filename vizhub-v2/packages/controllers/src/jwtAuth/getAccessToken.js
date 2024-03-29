import fetch from 'node-fetch';
import { VizHubAPIError } from 'vizhub-entities';

const oAuthAccessTokenURL = 'https://github.com/login/oauth/access_token';
const client_id = process.env.REACT_APP_VIZHUB_GITHUB_CLIENT_ID;
const client_secret = process.env.VIZHUB_GITHUB_CLIENT_SECRET;

// Get an access token from GitHub's API.
export const getAccessToken = async (code) => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ client_id, client_secret, code }),
  };
  const response = await fetch(oAuthAccessTokenURL, fetchOptions);
  const data = await response.json();
  if (data.error) {
	  console.log(data.error);
    if (data.error === 'Not Found') {
      console.log(
        'Check that you have your GitHub OAuth environment variables set'
      );
    }
    throw new VizHubAPIError({
      error: 'github_user_fetch_error',
      errorDescription: data.error.error_description || data.error.error,
      errorURL: data.error.documentation_url,
    });
  }

  return data.access_token;
};
