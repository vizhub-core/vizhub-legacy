import { VizHubAPIError } from 'vizhub-entities';
import fetch from 'node-fetch';
import { config, errorObj } from './common';

export const getUser = async (type, accessToken) => {
  let getUserUrl =
    type === 'github'
      ? config[`${type}`]['getUserInfoUrl']
      : `${config[`${type}`]['getUserInfoUrl']}${accessToken}`;

  const fetchOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (type === 'github') {
    fetchOptions.headers.Authorization = `token ${accessToken}`;
  }

  const response = await fetch(getUserUrl, fetchOptions);
  const user = await response.json();

  if (user.message) {
    let error = errorObj(type, user);
    throw new VizHubAPIError(error);
  }

  return user;
};
