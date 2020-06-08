import React, { useCallback } from 'react';
import { Avatar } from '../../../../../Avatar';
import { fetchUser } from '../fetchUser';
import { useCache } from './useCache';
import { Button } from '../../../../styles';
import { UserName } from '../styles';
import { Wrapper, LoadingText, UserWrapper } from './styles';

export const Collaborator = ({ collaborator, removeCollaborator, isLast }) => {
  const { userId } = collaborator;
  const { requestData } = useCache();

  const user = requestData({
    cacheKey: 'user_' + userId,
    goFetch: () => fetchUser(userId),
  });

  const handleRemoveClick = useCallback(() => {
    removeCollaborator(userId);
  }, [userId, removeCollaborator]);

  return (
    <Wrapper isLast={isLast}>
      {user ? (
        <>
          <UserWrapper>
            <Avatar size={24} user={user} isDisabled={true} />
            <UserName>{user.fullName}</UserName>
          </UserWrapper>
          <Button isRed={true} onClick={handleRemoveClick}>
            Remove
          </Button>
        </>
      ) : (
        <LoadingText>Loading...</LoadingText>
      )}
    </Wrapper>
  );
};
