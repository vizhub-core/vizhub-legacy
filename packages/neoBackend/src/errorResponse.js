// This module defines the standard error response used
// throughout the VizHub JSON API. Inspired by GitHub's format:
// https://developer.github.com/apps/managing-oauth-apps/troubleshooting-oauth-app-access-token-request-errors/#bad-verification-code
//
export const errorResponse = options => {
  if (!options.error) {
    throw new Error(
      'The field "error" must be specified for an error response. It should be a name for the error, such as "redirect_uri_mismatch" or "invalid_operation".'
    );
  }
  if (!options.errorDescription) {
    throw new Error(
      'The field "errorDescription" must be specified for an error response. It should be a long form human-readable description for the error, such as "The redirect_uri MUST match the registered callback URL for this application.".'
    );
  }
  if (!options.errorURL) {
    console.warn(
      'errorURL not provided for error ' +
        options.error +
        '. Consider adding this to improve developer experience.'
    );
  }
  return options;
};
