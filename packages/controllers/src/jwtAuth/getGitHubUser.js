import { VizHubAPIError } from 'vizhub-entities';
import fetch from 'node-fetch';
// Documentation: https://developer.github.com/v3/users/#get-the-authenticated-user
const gitHubUserURL = 'https://api.github.com/user';

export const getGitHubUser = async (accessToken) => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `token ${accessToken}`,
    },
  };

  const response = await fetch(gitHubUserURL, fetchOptions);
  const gitHubUser = await response.json();

  // fetch email even if user mark email as private(not to show)
  if (!gitHubUser.email) {
    let emailsRespone = await fetch(`${gitHubUserURL}/emails`, fetchOptions);
    emailsRespone = await emailsRespone.json();

    // Filter by v.visibility === 'private' because it turns out GitHub auto-generates an email ID
    // that is not actually the user's email ID.
    gitHubUser.email =
      emailsRespone.find((v) => v.visibility === 'private').email || '';
    
    if( gitHubUser.email === ''){
      console.log('Unable to resolve email ID. This should never happen. GitHub user: ');
      console.log(JSON.stringify(gitHubUser, null, 2));
    }
  }

  if (gitHubUser.message) {
    throw new VizHubAPIError({
      error: 'github_user_fetch_error',
      errorDescription: gitHubUser.message,
      errorURL: gitHubUser.documentation_url,
    });
  }

  return gitHubUser;
};
