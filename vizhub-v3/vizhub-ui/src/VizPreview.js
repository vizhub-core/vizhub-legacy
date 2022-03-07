import React from 'react';
import { classed } from './classed';

const Wrapper = classed('viz-preview');
const ContentContainer = classed('content-container');
const Thumbnail = classed('thumbnail');
const LastUpdatedDate = classed('last-updated-date');
const Title = classed('title');
const MetaContainer = classed('meta-container');
const OwnerAvatarImage = classed('owner-avatar-image', 'img');
const OwnerName = classed('owner-name');

// See also
// archive/vizhub-v3-false-start/src/App/VizPreview.js
export const VizPreview = ({
  title,
  thumbnailImageURL,
  lastUpdatedDateFormatted,
  ownerName,
  ownerAvatarURL,
}) => (
  <Wrapper>
    <Thumbnail
      style={{ backgroundImage: `url("${thumbnailImageURL}")` }}
      alt={title}
    ></Thumbnail>
    <ContentContainer>
      <LastUpdatedDate>{lastUpdatedDateFormatted}</LastUpdatedDate>
      <Title>{title}</Title>
    </ContentContainer>
    <MetaContainer>
      {ownerName ? (
        <>
          <OwnerAvatarImage src={ownerAvatarURL} alt={ownerName} />
          <OwnerName>{ownerName}</OwnerName>
        </>
      ) : null}
    </MetaContainer>
  </Wrapper>
);
