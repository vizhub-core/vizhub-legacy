import { isOwner } from './isOwner';
import { isCollaborator } from './isCollaborator';

export const allowRead = (vizInfo, userId) =>
  vizInfo.privacy === 'private'
    ? isOwner(vizInfo, userId) || isCollaborator(vizInfo, userId)
    : true;
