import React from 'react';
import { CollaboratorWrapper } from './styles';
import { useCache } from './useCache';
import { fetchUsers } from './fetchUsers';

const Collaborator = ({ collaborator }) => {
  const { userId } = collaborator;
  const { requestData } = useCache();

  const user = requestData({
    cacheKey: userId,
    goFetch: () => fetchUsers([userId]),
  });

  return (
    <CollaboratorWrapper>{user ? user.id : 'Loading...'}</CollaboratorWrapper>
  );
};
export const CollaboratorList = ({ collaborators }) => {
  return collaborators.map((collaborator) => (
    <Collaborator key={collaborator.userId} collaborator={collaborator} />
  ));
};
