import { VizHubError, VizHubErrorCode, VizId } from 'vizhub-entities';
import {
  VIZ_INFO_NOT_FOUND,
  VIZ_CONTENT_NOT_FOUND,
  USER_NOT_FOUND,
} from './errorCodes';

export const vizInfoNotFound = (vizId: VizId): Error =>
  new VizHubError('Viz info not found with id: ' + vizId, VIZ_INFO_NOT_FOUND);

export const vizContentNotFound = (vizId: VizId): Error =>
  new VizHubError(
    'Viz content not found with id: ' + vizId,
    VIZ_CONTENT_NOT_FOUND
  );

export const userNotFound = (userId: UserId): Error =>
  new VizHubError('User not found with id: ' + userId, USER_NOT_FOUND);

export const userNotFoundByEmail = (email): Error =>
  new VizHubError('User not found with email: ' + email, USER_NOT_FOUND);
