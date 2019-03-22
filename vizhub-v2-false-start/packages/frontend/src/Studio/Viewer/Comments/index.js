import React from 'react';
import { withTheme } from 'styled-components';
import { avatarUrl } from '../avatarUrl';
import { AuthorName } from '../styles';
import TimeAgo from 'timeago-react';

import {
  Wrapper,
  Comment,
  CommentAvatar,
  Right,
  Time,
  Content,
  AuthorNameTime
} from './styles';

export const Comments = withTheme(({ theme, comments }) => (
  <Wrapper>
    {comments.map(({ user, date, content }, i) => (
      <Comment key={i}>
        <CommentAvatar src={avatarUrl(user, theme.infoAvatarHeight)} />
        <Right>
          <AuthorNameTime>
            <AuthorName>{user.name}</AuthorName>
            <Time>
              <TimeAgo datetime={date} />
            </Time>
          </AuthorNameTime>
          <Content>{content}</Content>
        </Right>
      </Comment>
    ))}
  </Wrapper>
));
