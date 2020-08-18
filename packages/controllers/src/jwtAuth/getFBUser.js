import { VizHubAPIError } from 'vizhub-entities';
import fetch from 'node-fetch';

// Documentation: https://developers.google.com/identity/sign-in/web/backend-auth#calling-the-tokeninfo-endpoint

const fbGetUserInfoUrl = `https://graph.facebook.com/v8.0/me?fields=id,email,name,first_name,last_name,picture&access_token=`;

export const getFBUser = async (token) => {
  let fetchOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${fbGetUserInfoUrl}${token}`, fetchOptions);

  const fbUser = await response.json();

  if (fbUser.error) {
    throw new VizHubAPIError({
      error: 'facebook_token_fetch_error',
      errorDescription: fbUser.error.message,
      errorType: fbUser.error.type,
    });

    return fbUser;
  }
};
