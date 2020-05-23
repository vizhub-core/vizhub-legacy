export const allowRead = (vizInfo, userId) => {
  if (vizInfo.privacy === 'private') {
    const isOwner = vizInfo.owner === userId;
    const isCollaborator =
      vizInfo.collaborators &&
      !!vizInfo.collaborators.find(
        (collaborator) => collaborator.userId === userId
      );

    return isOwner || isCollaborator;
  }
  return true;
};
