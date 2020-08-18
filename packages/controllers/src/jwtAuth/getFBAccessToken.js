import fetch from 'node-fetch';
import { VizHubAPIError } from 'vizhub-entities';

// Documentation: https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/

// need made key and seceret dynamic once tested

const oAuthAccessTokenURL = `https://graph.facebook.com/v8.0/oauth/access_token?client_id=392704021076365&redirect_uri=http://localhost:3000/authenticated&client_secret=13aedfb953666b2a425e5ba00deef3c1&code=`;
// const client_id = process.env.REACT_APP_VIZHUB_GITHUB_CLIENT_ID;
// const client_secret = process.env.VIZHUB_GITHUB_CLIENT_SECRET;

// Get an access token from FB's API.
export const getFBAccessToken = async (code) => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${oAuthAccessTokenURL}${code}`, fetchOptions);
  const { error, access_token, type } = await response.json();
  if (error) {
    if (error === 'Not Found') {
      console.log(
        'Check that you have your Facebook OAuth environment variables set'
      );
    }
    throw new VizHubAPIError({
      error: error.message,
      errorDescription: error.type,
      errorCode: data.error_subcode,
    });
  }

  return access_token;
};
