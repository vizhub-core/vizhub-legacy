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

export const ProfilePane = ({ user }) => {
  return user ? (
    <Wrapper>
      <AuthorAvatar>
        <Avatar size={80} user={user} />
      </AuthorAvatar>
      <AuthorInfo>
        <AuthorName>{getUserFullName(user)}</AuthorName>
        <AuthorUserName>{getUserName(user)}</AuthorUserName>
      </AuthorInfo>
    </Wrapper>
  ) : null;
};
