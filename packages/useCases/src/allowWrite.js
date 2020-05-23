export const allowWrite = (vizInfo, userId) => {
  const isOwner = vizInfo.owner === userId;
  const isCollaborator =
    vizInfo.collaborators &&
    !!vizInfo.collaborators.find(
      (collaborator) => collaborator.userId === userId
    );

  return vizInfo.anyoneCanEdit || isOwner || isCollaborator;
};
