import React from 'react';
import {
  Wrapper,
  AuthorAvatar,
  AuthorInfo,
  AuthorName,
  AuthorUserName,
} from './styles';
import { getUserName, getUserFullName } from 'vizhub-presenters';
import { Avatar } from '../../../Avatar';

export const ProfilePane = ({ user, isSmall = false }) => {
  return user ? (
    <Wrapper>
      <AuthorAvatar isSmall={isSmall}>
        <Avatar size={isSmall ? 80 : 120} user={user} />
      </AuthorAvatar>
      <AuthorInfo>
        <AuthorName isSmall={isSmall}>{getUserFullName(user)}</AuthorName>
        <AuthorUserName>{getUserName(user)}</AuthorUserName>
      </AuthorInfo>
    </Wrapper>
  ) : null;
};
