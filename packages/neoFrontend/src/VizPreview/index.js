import React from 'react';
import { getUserName } from 'vizhub-presenters';
import { Author } from '../Author';
import {
  Wrapper,
  ImageLink,
  VizPreviewFooter,
  VizPreviewTitle,
} from './styles';

import { PrivacyNotice } from '../PrivacyNotice';

export { VizPreviews } from './styles';

export const VizPreview = ({ vizInfo, ownerUser, openEditor = false }) => {
  const { id, title, privacy } = vizInfo;
  const isPrivate = privacy === 'private';
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
          backgroundImage: `url(/api/visualization/thumbnail/${id}.png)`,
        }}
      />
      <VizPreviewFooter borderRadiusLarge={true}>
        <VizPreviewTitle to={link}>{title}</VizPreviewTitle>
        <Author ownerUser={ownerUser} isSmall={true} />
      </VizPreviewFooter>
      {isPrivate ? <PrivacyNotice isVizPreview={true} /> : null}
    </Wrapper>
  );
};
