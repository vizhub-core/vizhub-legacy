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

export const Comments = withTheme(({ theme, userData, comments }) => (
  <Wrapper>
    {comments.map(({ authorUserId, date, content }, i) => {
      const authorUserData = userData[authorUserId];
      return (
        <Comment key={i}>
          <CommentAvatar
            src={avatarUrl(authorUserData, theme.infoAvatarHeight)}
          />
          <Right>
            <AuthorNameTime>
              <AuthorName>{authorUserData.name}</AuthorName>
              <Time>
                <TimeAgo datetime={date} />
              </Time>
            </AuthorNameTime>
            <Content>{content}</Content>
          </Right>
        </Comment>
      );
    })}
  </Wrapper>
));
