import React from 'react';
import { withTheme } from 'styled-components';
import { avatarUrl } from '../avatarUrl';
import { timeFormat } from 'd3-time-format';
import { Wrapper, InfoAvatar, OwnerNamePublishDate } from './styles';
import { AuthorName } from '../styles';
import { SmallText } from '../styles';

const formatPublishDate = timeFormat('%B %d, %Y');

export const OwnerInfo = withTheme(({ theme, user, publishDate }) => (
  <Wrapper>
    <InfoAvatar src={avatarUrl(user, theme.infoAvatarHeight)} />
    <OwnerNamePublishDate>
      <AuthorName>{user.name}</AuthorName>
      <SmallText>{formatPublishDate(publishDate)}</SmallText>
    </OwnerNamePublishDate>
  </Wrapper>
));
