import { isOwner } from './isOwner';
import { isCollaborator } from './isCollaborator';

export const allowWrite = (vizInfo, userId) =>
  vizInfo.anyoneCanEdit ||
  isOwner(vizInfo, userId) ||
  isCollaborator(vizInfo, userId);
