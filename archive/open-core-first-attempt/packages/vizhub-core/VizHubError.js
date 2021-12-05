// Inspired by
// https://github.com/share/sharedb/blob/master/lib/error.js
// Follows the same pattern so that VizHub can easily deal with
// both ShareDB errors and VizHub errors.
export function VizHubError(code, message) {
  this.code = code;
  this.message = message || '';
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, VizHubError);
  } else {
    this.stack = new Error().stack;
  }
}

VizHubError.prototype = Object.create(Error.prototype);
VizHubError.prototype.constructor = VizHubError;
VizHubError.prototype.name = 'VizHubError';

// Codes.
VizHubError.codes = {
  ERR_PERMISSION_DENIED: 'ERR_PERMISSION_DENIED',
  ERR_NOT_FOUND: 'ERR_NOT_FOUND',
};
