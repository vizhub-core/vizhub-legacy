import React from 'react';
import marked from 'marked';
import { Avatar } from '../../../../Avatar';
import {
  Wrapper,
  Left,
  Right,
  Authorship,
  AuthorAvatar,
  AuthorName,
  AuthorshipMeta,
  Video,
  VideoThumbnail,
  Description,
  SemiBold,
  VizLink,
  Author
} from './styles';

export const DescriptionSection = ({ visualization, ownerUser }) => (
  <Wrapper>
    <Left>
      <Authorship>
        <Author>
          <AuthorAvatar>
            <Avatar size={40} user={ownerUser} />
          </AuthorAvatar>
          <AuthorName>{ownerUser.fullName}</AuthorName>
        </Author>
        <AuthorshipMeta>
          <div>
            Lasted Edited <SemiBold>June 5, 2019</SemiBold>
          </div>
          <div>
            Forked from <VizLink to="/">Name of forked viz</VizLink>{' '}
            <SemiBold>January 6, 2018</SemiBold>
          </div>
        </AuthorshipMeta>
      </Authorship>
      <Description
        dangerouslySetInnerHTML={{
          __html: marked(visualization.info.description)
        }}
      />
    </Left>
    <Right>
      <Video>
        <VideoThumbnail />
        Video title
      </Video>
    </Right>
  </Wrapper>
);
