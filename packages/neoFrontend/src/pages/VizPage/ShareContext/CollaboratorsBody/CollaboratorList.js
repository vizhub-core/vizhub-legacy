import React from 'react';
import { Collaborator } from './Collaborator';
import { CollaboratorListWrapper } from './styles';

export const CollaboratorList = ({ collaborators, removeCollaborator }) =>
  collaborators && collaborators.length > 0 ? (
    <CollaboratorListWrapper>
      {collaborators.map((collaborator, i) => (
        <Collaborator
          key={collaborator.userId}
          collaborator={collaborator}
          removeCollaborator={removeCollaborator}
          isLast={i === collaborators.length - 1}
        />
      ))}
    </CollaboratorListWrapper>
  ) : null;
