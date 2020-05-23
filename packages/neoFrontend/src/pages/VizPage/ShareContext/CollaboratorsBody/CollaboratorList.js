import React from 'react';
import { Collaborator } from './Collaborator';

export const CollaboratorList = ({ collaborators, removeCollaborator }) => {
  return collaborators.map((collaborator) => (
    <Collaborator
      key={collaborator.userId}
      collaborator={collaborator}
      removeCollaborator={removeCollaborator}
    />
  ));
};
