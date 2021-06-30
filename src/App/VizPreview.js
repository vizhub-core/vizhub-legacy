import React from 'react';
import { classed } from './classed';

const Wrapper = classed('viz-preview', 'a');
const ContentContainer = classed('content-container');
const Thumbnail = classed('thumbnail');
const LastUpdatedDate = classed('last-updated-date');
const Title = classed('title');

const urlBase = 'https://vizhub.com';
const thumbnailURL = (id) =>
  `url(${urlBase}/api/visualization/thumbnail/${id}.png)`;

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
    </Wrapper>
  );
};
