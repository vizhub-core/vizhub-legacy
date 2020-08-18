import { VizHubAPIError } from 'vizhub-entities';
import fetch from 'node-fetch';

// Documentation: https://developers.google.com/identity/sign-in/web/backend-auth#calling-the-tokeninfo-endpoint
const googleUserInfoURL = 'https://oauth2.googleapis.com/tokeninfo?id_token=';

export const getGoogleUser = async (idToken) => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${googleUserInfoURL}${idToken}`, fetchOptions);
  const googleUser = await response.json();

  if (googleUser.message) {
    throw new VizHubAPIError({
      error: 'google_user_fetch_error',
      errorDescription: googleUser.message,
      errorURL: googleUser.documentation_url,
    });
  }

  return googleUser;
};
