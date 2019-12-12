import React from 'react';
import { FrameFooter } from '../styles';
import { Wrapper, ImageLink } from './styles';
export { VizPreviews } from './styles';

export const VizPreview = ({ vizInfo, ownerUserName, openEditor }) => {
  const { id, title } = vizInfo;
  return (
    <Wrapper>
      <ImageLink
        key={id}
        to={`/${ownerUserName}/${id}${openEditor ? '?edit=files' : ''}`}
        title={title}
        style={{
          backgroundImage: `url(/api/visualization/thumbnail/${id}.png)`
        }}
      />
      <FrameFooter>foo</FrameFooter>
    </Wrapper>
  );
};
