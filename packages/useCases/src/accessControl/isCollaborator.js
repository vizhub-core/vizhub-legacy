export const isCollaborator = (vizInfo, userId) =>
  vizInfo.collaborators &&
  !!vizInfo.collaborators.find(
    (collaborator) => collaborator.userId === userId
  );
