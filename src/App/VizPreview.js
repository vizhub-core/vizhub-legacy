import React from 'react';
import { classed } from './classed';

const Wrapper = classed('viz-preview');
const ImageLink = classed('image-link', 'a');
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
    <Wrapper>
      <ImageLink
        href={href}
        style={{ backgroundImage: thumbnailURL(id) }}
      ></ImageLink>
      <Title>{title}</Title>
    </Wrapper>
  );
};
