import React from 'react';
import { getUserName, getUserFullName } from 'vizhub-presenters';
import { Avatar } from '../Avatar';
import { HorizontalRule } from '../styles';
import { Container, UserPreview, UserName, Entry } from './styles';

export const UserPreviewList = ({ user, users, onSelect, isNavSearch }) => {
  if (users.length === 0) return null;
  return (
    <Container>
      {isNavSearch ? <Entry>Users</Entry> : null}
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
      {isNavSearch ? (
        <>
          <HorizontalRule />
          <Entry isSmall>Hit enter to search vizzes.</Entry>
        </>
      ) : null}
    </Container>
  );
};
