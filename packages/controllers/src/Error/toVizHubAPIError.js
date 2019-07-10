import { VizHubAPIError } from 'vizhub-entities';
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

  console.log('');
  console.log('Unknown error type passed into toVizHubAPIError.');
  console.log(`\tName: ${error.name}`);
  console.log(`\tMessage: ${error.message}`);
  console.log('Consider handling this type of error..');
  console.log('');

  return error;
};
