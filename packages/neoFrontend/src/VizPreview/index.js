import React from 'react';
import { Wrapper, ImageLink, VizPreviewFooter } from './styles';
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
      <VizPreviewFooter borderRadiusLarge={true}>
        <div>foo</div>
        <div>bar</div>
      </VizPreviewFooter>
    </Wrapper>
  );
};
