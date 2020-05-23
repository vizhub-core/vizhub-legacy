export const isCollaborator = (vizInfo, userId) =>
  vizInfo.collaborators &&
  !!vizInfo.collaborators.find(
    (collaborator) => collaborator.userId === userId
  );

export const isOwner = (vizInfo, userId) => vizInfo.owner === userId;

export const allowRead = (vizInfo, userId) =>
  vizInfo.privacy === 'private'
    ? isOwner(vizInfo, userId) || isCollaborator(vizInfo, userId)
    : true;
