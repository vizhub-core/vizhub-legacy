import React from 'react';
import { Wrapper, AuthorAvatar, AuthorName } from './styles';
import { getUserName, getUserFullName } from 'vizhub-presenters';
import { Avatar } from '../Avatar';

export const Author = ({ ownerUser, isSmall = false }) =>
  ownerUser ? (
    <Wrapper to={`/${getUserName(ownerUser)}`}>
      <AuthorAvatar isSmall={isSmall}>
        <Avatar size={isSmall ? 20 : 40} user={ownerUser} />
      </AuthorAvatar>
      <AuthorName isSmall={isSmall}>{getUserFullName(ownerUser)}</AuthorName>
    </Wrapper>
  ) : null;
