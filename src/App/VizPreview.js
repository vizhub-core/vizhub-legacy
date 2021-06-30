import React from 'react';
import { classed } from './classed';

const Wrapper = classed('viz-preview', 'a');
const ContentContainer = classed('content-container');
const Thumbnail = classed('thumbnail');
const LastUpdatedDate = classed('last-updated-date');
const Title = classed('title');
const MetaContainer = classed('meta-container');
const AuthorAvatarImage = classed('author-avatar-image');

const urlBase = 'https://vizhub.com';
const thumbnailURL = (id) =>
  `url(${urlBase}/api/visualization/thumbnail/${id}.png)`;

// Use 's=180' because that's what GitHub uses all over the place
// for small avatars, so they are more likely to be cached.
const avatarUrl = (user) => user.avatarUrl + '&s=180';

export const VizPreview = ({ vizInfo, ownerUser }) => {
  const { id, title } = vizInfo;

  // Should never happen, but being defensive so it doesn't crash.
  const userName = ownerUser ? ownerUser.userName : 'undefined';

  const href = `/${userName}/${id}`;

  //  return <a href={href}>{title}</a>;
  return (
    <Wrapper href={href}>
      <Thumbnail style={{ backgroundImage: thumbnailURL(id) }}></Thumbnail>
      <ContentContainer>
        <LastUpdatedDate>January 10, 2020</LastUpdatedDate>
        <Title>{title}</Title>
      </ContentContainer>
      <MetaContainer>
        {ownerUser ? (
          <>
            {' '}
            <AuthorAvatarImage src={avatarUrl(ownerUser)} />{' '}
            {ownerUser.userName}
          </>
        ) : null}
      </MetaContainer>
    </Wrapper>
  );
};
