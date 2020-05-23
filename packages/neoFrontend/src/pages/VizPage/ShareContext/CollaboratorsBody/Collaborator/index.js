import React from 'react';
import { Avatar } from '../../../../../Avatar';
import { fetchUser } from '../fetchUser';
import { useCache } from './useCache';
import { UserName } from '../styles';
import { Wrapper, LoadingText } from './styles';

export const Collaborator = ({ collaborator }) => {
  const { userId } = collaborator;
  const { requestData } = useCache();

  const user = requestData({
    cacheKey: 'user_' + userId,
    goFetch: () => fetchUser(userId),
  });

  return (
    <Wrapper>
      {user ? (
        <>
          <Avatar size={24} user={user} isDisabled={true} />
          <UserName>{user.fullName}</UserName>
        </>
      ) : (
        <LoadingText>Loading...</LoadingText>
      )}
    </Wrapper>
  );
};
