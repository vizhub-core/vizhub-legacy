import React from 'react';
import { SearchSVG } from '../svg';
import { getUserName, getUserFullName } from 'vizhub-presenters';
import { Avatar } from '../Avatar';
import { HorizontalRule } from '../styles';
import {
  Container,
  UserName,
  Entry,
  ClickableEntry,
  SearchIcon,
} from './styles';

export const UserPreviewList = ({ user, users, onSelect, onVizSearch }) => {
  if (users.length === 0) return null;
  return (
    <Container>
      {onVizSearch ? <Entry isSmall>Users:</Entry> : null}
      {users &&
        users.map((userToRender) => (
          <ClickableEntry
            className={user === userToRender ? 'active' : ''}
            key={getUserName(userToRender)}
            onClick={() => onSelect(userToRender)}
          >
            <Avatar size={24} user={userToRender} isDisabled={true} />
            <UserName>{getUserFullName(userToRender)}</UserName>
          </ClickableEntry>
        ))}
      {onVizSearch ? (
        <>
          <HorizontalRule />
          <Entry isSmall>Vizzes:</Entry>
          <ClickableEntry onClick={onVizSearch}>
            <SearchIcon>
              <SearchSVG height="16" />
            </SearchIcon>{' '}
            Search for vizzes
          </ClickableEntry>
        </>
      ) : null}
    </Container>
  );
};
