import React from 'react';
import { classed } from './classed';

const Wrapper = classed('viz-preview', 'a');
const ContentContainer = classed('content-container');
const Thumbnail = classed('thumbnail');
const LastUpdatedDate = classed('last-updated-date');
const Title = classed('title');
const MetaContainer = classed('meta-container');
const OwnerAvatarImage = classed('owner-avatar-image', 'img');
const OwnerName = classed('owner-name');

const urlBase = 'https://vizhub.com';
const thumbnailURL = (id) =>
  `url(${urlBase}/api/visualization/thumbnail/${id}.png)`;

// Seen on GitHub: 32px, 24px. Always uses double that in "s=" for hidpi.
// If you change this, also change .owner-avatar-image in viz-preview.scss.
const avatarSize = 32;
const avatarUrl = (user) => `${user.avatarUrl}&s=${avatarSize * 2}`;

// TODO refactor this into a common definition,
// as soon as we need this logic in multiple places.
//export const dateToTimestamp = () => Math.floor(new Date().getTime() / 1000);
export const timestampToDate = (timestamp) => new Date(timestamp * 1000);

const formatTimestamp = (timestamp) =>
  timestampToDate(timestamp).toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const VizPreview = ({ vizInfo, ownerUser }) => {
  // Todo refactor this logic into a presenter and add tests for it.
  const { id, title, lastUpdatedTimestamp } = vizInfo;

  // Undefined `ownerUser` should never happen,
  // but being defensive so it doesn't crash in the worst case.
  const { userName, avatarImageSrc, ownerName } = ownerUser
    ? {
        userName: ownerUser.userName,
        userName: null,
        avatarImageSrc: avatarUrl(ownerUser),
        // Some users do not have `fullName` populated,
        // so fall back to `userName`.
        ownerName: ownerUser ? ownerUser.fullName || ownerUser.userName : null,
      }
    : {
        userName: null,
        avatarImageSrc: null,
        ownerName: null,
      };

  // TODO big change (need to think deeply about it more):
  // const href = `/${id}`;
  // Why?
  //  - Simpler URLs for vizzes
  //  - Easy to redirect from old format
  //  - Paves the way for custom urls (slugs)
  //    - This could be a paid feature
  //  - Establishes a global namespace, like NPM
  //  - Paves the way to `import { X } from 'vizhub/scatter-plot'`

  const href = `/${userName}/${id}`;
  const backgroundImage = thumbnailURL(id);
  const lastUpdatedDateFormatted = formatTimestamp(lastUpdatedTimestamp);

  const thumbnailAltText = title;
  const ownerAvatarAltText = ownerName;

  return (
    <Wrapper href={href}>
      <Thumbnail style={{ backgroundImage }} alt={thumbnailAltText}></Thumbnail>
      <ContentContainer>
        <LastUpdatedDate>{lastUpdatedDateFormatted}</LastUpdatedDate>
        <Title>{title}</Title>
      </ContentContainer>
      <MetaContainer>
        {ownerUser ? (
          <>
            <OwnerAvatarImage src={avatarImageSrc} alt={ownerAvatarAltText} />
            <OwnerName>{ownerName}</OwnerName>
          </>
        ) : null}
      </MetaContainer>
    </Wrapper>
  );
};
