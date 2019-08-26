import React, { useMemo } from 'react';
import marked from 'marked';
import { toDate } from 'vizhub-entities';
import {
  showCreatedDate,
  showVideoThumbnail
} from '../../../../../featureFlags';
import { Avatar } from '../../../../../Avatar';
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
  vizInfo,
  ownerUser,
  forkedFromVisualizationInfo,
  forkedFromVisualizationOwnerUserName,
  size
}) => {
  const created = useMemo(() => formatTimestamp(vizInfo.createdTimestamp), [
    vizInfo.createdTimestamp
  ]);

  const lastUpdated = useMemo(
    () => formatTimestamp(vizInfo.lastUpdatedTimestamp),
    [vizInfo.lastUpdatedTimestamp]
  );

  return (
    <Wrapper size={size}>
      <Left>
        <Authorship size={size}>
          <Author to={`/${ownerUser.userName}`}>
            <AuthorAvatar>
              <Avatar size={40} user={ownerUser} />
            </AuthorAvatar>
            <AuthorName>{ownerUser.fullName}</AuthorName>
          </Author>
          <AuthorshipMeta size={size}>
            <div>
              Lasted Edited <SemiBold>{lastUpdated}</SemiBold>
            </div>
            {forkedFromVisualizationInfo ? (
              <div>
                Forked from{' '}
                <VizLink
                  to={`/${forkedFromVisualizationOwnerUserName}/${forkedFromVisualizationInfo.id}`}
                >
                  {forkedFromVisualizationInfo.title}
                </VizLink>
                {showCreatedDate ? (
                  <>
                    {' '}
                    <SemiBold>{created}</SemiBold>
                  </>
                ) : null}
              </div>
            ) : null}
          </AuthorshipMeta>
        </Authorship>
        <Description
          size={size}
          dangerouslySetInnerHTML={{ __html: marked(vizInfo.description) }}
        />
      </Left>
      {showVideoThumbnail ? (
        <Right size={size}>
          <Video>
            <VideoThumbnail />
            Video title
          </Video>
        </Right>
      ) : null}
    </Wrapper>
  );
};
