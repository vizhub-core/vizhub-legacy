import React from 'react';
import { getUserName, getUserFullName } from 'vizhub-presenters';
import { Avatar } from '../Avatar';
import { Container, UserPreview, UserName } from './styles';

export const UserPreviewList = ({ user, users, onSelect }) => {
  return (
    <Container>
      {users &&
        users.map((userToRender) => (
          <UserPreview
            className={user === userToRender ? 'active' : ''}
            key={getUserName(userToRender)}
            onClick={() => onSelect(userToRender)}
          >
            <Avatar size={24} user={userToRender} isDisabled={true} />
            <UserName>{getUserFullName(userToRender)}</UserName>
          </UserPreview>
        ))}
    </Container>
  );
};
