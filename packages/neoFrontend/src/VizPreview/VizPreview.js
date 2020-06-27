import React from 'react';
import { getUserName, getUpvoteCount } from 'vizhub-presenters';
import { Author } from '../Author';
import { Voter } from '../Voter';
import {
  Wrapper,
  ImageLink,
  VizPreviewFooter,
  VizPreviewTitle,
  Bottom,
} from './styles';

import { PrivacyNotice } from '../PrivacyNotice';

const noop = () => {};

export const VizPreview = ({ vizInfo, ownerUser, openEditor = false }) => {
  const { id, title, privacy, upvotes } = vizInfo;
  const isPrivate = privacy === 'private';
  const link = `/${getUserName(ownerUser)}/${id}${
    openEditor ? '?edit=files' : ''
  }`;

  const upvoteCount = getUpvoteCount(upvotes);

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
        <Bottom>
          <Author ownerUser={ownerUser} isSmall={true} />
          <Voter
            canVote={false}
            didVote={false}
            upvoteCount={upvoteCount}
            onUpvoteClick={noop}
            isPrivate={isPrivate}
            whyCantUpvote="Upvoting from previews is not supported yet."
          />
        </Bottom>
      </VizPreviewFooter>
      {isPrivate ? <PrivacyNotice isVizPreview={true} /> : null}
    </Wrapper>
  );
};
