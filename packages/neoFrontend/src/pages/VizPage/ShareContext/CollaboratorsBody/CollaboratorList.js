import React from 'react';
import { CollaboratorWrapper, UserPreview, UserName } from './styles';
import { useCache } from './useCache';
import { Avatar } from '../../../../Avatar';
import { fetchUsers } from './fetchUsers';

const fetchUser = async (userId) => {
  try {
    const result = await fetchUsers([userId]);
    return result.users[0];
  } catch (error) {
    console.error(error);
  }
};

const Collaborator = ({ collaborator }) => {
  const { userId } = collaborator;
  const { requestData } = useCache();

  const user = requestData({
    cacheKey: 'user_' + userId,
    goFetch: () => fetchUser(userId),
  });

  console.log(user);

  return (
    <CollaboratorWrapper>
      {user ? (
        <UserPreview>
          <Avatar size={24} user={user} isDisabled={true} />
          <UserName>{user.fullName}</UserName>
        </UserPreview>
      ) : (
        'Loading...'
      )}
    </CollaboratorWrapper>
  );
};

export const CollaboratorList = ({ collaborators }) => {
  return collaborators.map((collaborator) => (
    <Collaborator key={collaborator.userId} collaborator={collaborator} />
  ));
};
