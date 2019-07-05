import { VizHubAPIError } from './VizHubAPIError';
export const toVizHubAPIError = error => {

  if (error instanceof VizHubAPIError) {
    return error;
  }
  if (error.name === 'JsonWebTokenError') {
    return new VizHubAPIError({
      error: 'jwt_error',
      errorDescription: error.message
    });
  }
};
