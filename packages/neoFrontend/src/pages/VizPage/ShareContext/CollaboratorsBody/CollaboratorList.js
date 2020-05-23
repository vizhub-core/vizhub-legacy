import React from 'react';
import { Collaborator } from './Collaborator';
import { CollaboratorListWrapper } from './styles';

export const CollaboratorList = ({ collaborators, removeCollaborator }) =>
  collaborators && collaborators.length > 0 ? (
    <CollaboratorListWrapper>
      {collaborators.map((collaborator) => (
        <Collaborator
          key={collaborator.userId}
          collaborator={collaborator}
          removeCollaborator={removeCollaborator}
        />
      ))}
    </CollaboratorListWrapper>
  ) : null;
