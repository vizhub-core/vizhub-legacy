import { VizHubAPIError } from '../Error';
import fetch from 'node-fetch';
const gitHubUserURL = 'https://api.github.com/user';

export const getGitHubUser = async accessToken => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `token ${accessToken}`
    }
  };

  const response = await fetch(gitHubUserURL, fetchOptions);
  const gitHubUser = await response.json();

  if (gitHubUser.message) {
    throw new VizHubAPIError({
      error: 'github_user_fetch_error',
      errorDescription: gitHubUser.message,
      errorURL: gitHubUser.documentation_url
    });
  }

  return gitHubUser;
};
