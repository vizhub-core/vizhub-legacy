import React, { useMemo } from 'react';
import marked from 'marked';
import { toDate } from 'vizhub-entities';
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

const formatTimestamp = timestamp =>
  toDate(timestamp).toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

export const DescriptionSection = ({
  visualization,
  ownerUser,
  forkedFromVisualizationInfo
}) => {
  const created = useMemo(
    () => formatTimestamp(visualization.info.createdTimestamp),
    [visualization.info.createdTimestamp]
  );

  const lastUpdated = useMemo(
    () => formatTimestamp(visualization.info.lastUpdatedTimestamp),
    [visualization.info.lastUpdatedTimestamp]
  );

  return (
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
              Lasted Edited <SemiBold>{lastUpdated}</SemiBold>
            </div>
            {forkedFromVisualizationInfo ? (
              <div>
                Forked from{' '}
                <VizLink to="/">{forkedFromVisualizationInfo.title}</VizLink>{' '}
                <SemiBold>{created}</SemiBold>
              </div>
            ) : null}
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
};
