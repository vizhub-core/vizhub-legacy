import fetch from 'node-fetch';
import { VizHubAPIError } from 'vizhub-entities';
import { config, errorObj } from './common';

// Get an access token from GitHub's API.
export const getAccessToken = async (type, code) => {
  let client_id = config[`${type}`][`client_id`];
  let client_secret = config[`${type}`][`client_secret`];

  let oAuthAccessTokenURL =
    type === 'github'
      ? config[`${type}`]['oAuthAccessTokenURL']
      : `${config[`${type}`]['oAuthAccessTokenURL']}${code}`;
  const fetchOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (type === 'github') {
    fetchOptions.body = JSON.stringify({ client_id, client_secret, code });
  }

  const response = await fetch(oAuthAccessTokenURL, fetchOptions);
  const data = await response.json();
  if (data.error) {
    if (data.error === 'Not Found') {
      console.log(
        'Check that you have your GitHub OAuth environment variables set'
      );
    }
    let error = errorObj(type, data);
    throw new VizHubAPIError(error);
  }

  return data.access_token;
};
