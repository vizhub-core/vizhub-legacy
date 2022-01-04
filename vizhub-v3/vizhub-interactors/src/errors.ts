import { VizHubError, VizHubErrorCode, VizId } from 'vizhub-entities';

export const VIZ_INFO_NOT_FOUND: VizHubErrorCode = 'VIZ_INFO_NOT_FOUND';
export const VIZ_CONTENT_NOT_FOUND: VizHubErrorCode = 'VIZ_CONTENT_NOT_FOUND';

export const vizInfoNotFound = (vizId: VizId): Error =>
  new VizHubError('Viz info not found with id: ' + vizId, VIZ_INFO_NOT_FOUND);

export const vizContentNotFound = (vizId: VizId): Error =>
  new VizHubError(
    'Viz content not found with id: ' + vizId,
    VIZ_CONTENT_NOT_FOUND
  );
