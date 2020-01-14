import React from 'react';
import { getUserName } from 'vizhub-presenters';
import { Author } from '../Author';
import {
  Wrapper,
  ImageLink,
  VizPreviewFooter,
  VizPreviewTitle
} from './styles';

export { VizPreviews } from './styles';

export const VizPreview = ({ vizInfo, ownerUser, openEditor = false }) => {
  const { id, title } = vizInfo;
  const link = `/${getUserName(ownerUser)}/${id}${
    openEditor ? '?edit=files' : ''
  }`;

  return (
    <Wrapper className="test-viz-preview" data-test-viz-id={id}>
      <ImageLink
        to={link}
        key={id}
        title={title}
        style={{
          backgroundImage: `url(/api/visualization/thumbnail/${id}.png)`
        }}
      />
      <VizPreviewFooter borderRadiusLarge={true}>
        <VizPreviewTitle to={link}>{title}</VizPreviewTitle>
        <Author ownerUser={ownerUser} isSmall={true} />
      </VizPreviewFooter>
    </Wrapper>
  );
};
