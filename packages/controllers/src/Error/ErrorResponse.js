import { VizHubAPIError } from 'vizhub-entities';

// This module defines the standard error response format used
// throughout the VizHub JSON API. Inspired by GitHub's format:
// https://developer.github.com/apps/managing-oauth-apps/troubleshooting-oauth-app-access-token-request-errors/#bad-verification-code
export const ErrorResponse = (vizHubAPIError) => {
  if (vizHubAPIError instanceof VizHubAPIError) {
    const { error, errorDescription, errorURL } = vizHubAPIError;
    return { error, errorDescription, errorURL };
  }
  throw new Error(
    [
      'ErrorResponse must be invoked with an instance of VizHubAPIError.',
      'Something else was passed in:',
      vizHubAPIError,
    ].join('\n')
  );
};
