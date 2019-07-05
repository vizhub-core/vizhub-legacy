// This module defines a custom error object for API errors
// that should be ultimately surfaced to end users.
//
// When an error happens, construct and throw one of these.
export class VizHubAPIError extends Error {
  constructor(options) {
    super(options.errorDescription);
    validate(options);
    this.name = 'VizHubAPIError';
    Object.assign(this, options);
  }
}

const validate = options => {
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
      [
        'errorURL not provided for error ',
        options.error,
        '. Consider adding this to improve developer experience.'
      ].join('')
    );
  }
};
