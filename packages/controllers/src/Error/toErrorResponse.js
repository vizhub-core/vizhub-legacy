import { toVizHubAPIError } from './toVizHubAPIError';
import { ErrorResponse } from './ErrorResponse';
export const toErrorResponse = error => ErrorResponse(toVizHubAPIError(error));
