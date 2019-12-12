import React from 'react';
import { getUserName } from '../accessors';
import { Author } from '../Author';
import { Wrapper, ImageLink, VizPreviewFooter } from './styles';

export { VizPreviews } from './styles';

export const VizPreview = ({ vizInfo, ownerUser, openEditor }) => {
  const { id, title } = vizInfo;

  return (
    <Wrapper>
      <ImageLink
        key={id}
        to={`/${getUserName(ownerUser)}/${id}${
          openEditor ? '?edit=files' : ''
        }`}
        title={title}
        style={{
          backgroundImage: `url(/api/visualization/thumbnail/${id}.png)`
        }}
      />
      <VizPreviewFooter borderRadiusLarge={true}>
        <Author ownerUser={ownerUser} isSmall={true} />
      </VizPreviewFooter>
    </Wrapper>
  );
};
