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

  // The following handles the case where the user's email address is marked private.
  if (!gitHubUser.email) {
    // Since VizHub requests permissions to read emails when the user authenticates,
    // we can use the GitHub API to retreive the primary email ID, even if it's marked private.
    const response = await fetch(`${gitHubUserURL}/emails`, fetchOptions);

    // Example value for `emails`, when primary email is marked private:
    // [
    //   {
    //     email: 'curran.kelleher@gmail.com',
    //     primary: true,
    //     verified: true,
    //     visibility: 'private'
    //   },
    //   {
    //     email: 'curran@datavis.tech',
    //     primary: false,
    //     verified: true,
    //     visibility: null
    //   },
    //   {
    //     email: '68416+curran@users.noreply.github.com',
    //     primary: false,
    //     verified: true,
    //     visibility: null
    //   }
    // ]
    const emails = await response.json();

    // Isolate only the primary email address.
    const primary = emails.find((d) => d.primary);

    // If found, record this as the user's primary email.
    if (primary) {
      gitHubUser.email = primary.email;
    }

    // Otherwise, report that the email could not be derived (should not happen).
    if (gitHubUser.email === '') {
      console.log(
        'Unable to resolve email ID. This should never happen. GitHub user: '
      );
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
