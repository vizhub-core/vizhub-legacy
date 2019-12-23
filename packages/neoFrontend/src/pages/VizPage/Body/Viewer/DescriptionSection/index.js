import React, { useMemo } from 'react';
import marked from 'marked';
import { toDate } from 'vizhub-entities';
import {
  showCreatedDate,
  showVideoThumbnail
} from '../../../../../featureFlags';
import {
  Wrapper,
  Left,
  Right,
  Authorship,
  AuthorshipMeta,
  Video,
  VideoThumbnail,
  Description,
  SemiBold,
  VizLink
} from './styles';
import { Author } from '../../../../../Author';
import { responsiveYouTube } from './responsiveYouTube';

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
  
  const description = vizInfo.description;
  const descriptionHTML = useMemo(
    () => responsiveYouTube(marked(description)),
    [description]
  );

  return (
    <Wrapper size={size}>
      <Left>
        <Authorship size={size}>
          <Author ownerUser={ownerUser} />
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
          className="viz-viewer-description"
          size={size}
          dangerouslySetInnerHTML={{ __html: descriptionHTML }}
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
