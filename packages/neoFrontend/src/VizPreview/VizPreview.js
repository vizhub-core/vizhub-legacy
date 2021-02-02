import React, { useCallback } from 'react';
import {
  getUserName,
  getUpvoteCount,
  isVizInfoPrivate,
} from 'vizhub-presenters';
import { sendEvent, upvoteEvent } from '../sendEvent';
import { Author } from '../Author';
import { Voter } from '../Voter';
import { ForksLink } from '../ForksLink';
import {
  Wrapper,
  ImageLink,
  VizPreviewFooter,
  VizPreviewTitle,
  Top,
  Bottom,
} from './styles';

import { PrivacyNotice } from '../PrivacyNotice';

const noop = () => {};

// Use production thumbnails during development.
const urlBase =
  process.env.NODE_ENV === 'development' ? 'https://staging.vizhub.com' : '';
const thumbnailURL = (id) =>
  `url(${urlBase}/api/visualization/thumbnail/${id}.png)`;

export const VizPreview = ({
  vizInfo,
  ownerUser,
  canVote = false,
  didVote = false,
  openEditor = false,
  onUpvoteClick = noop,
}) => {
  const { id, title, upvotes, forksCount } = vizInfo;
  const isPrivate = isVizInfoPrivate(vizInfo);
  const link = `/${getUserName(ownerUser)}/${id}${
    openEditor ? '?edit=files' : ''
  }`;

  const upvoteCount = getUpvoteCount(upvotes);

  const instrumentedOnUpvoteClick = useCallback(() => {
    onUpvoteClick();
    sendEvent(upvoteEvent(id, didVote, 'viz-preview'));
  }, [onUpvoteClick, id, didVote]);

  return (
    <Wrapper className="test-viz-preview" data-test-viz-id={id}>
      <ImageLink
        to={link}
        key={id}
        title={title}
        style={{
          backgroundImage: thumbnailURL(id),
        }}
      />
      <VizPreviewFooter borderRadiusLarge={true}>
        <Top>
          <VizPreviewTitle to={link} title={title}>
            {title}
          </VizPreviewTitle>
          {forksCount > 0 ? (
            <ForksLink
              isSmall
              vizId={id}
              forksCount={forksCount}
              ownerUser={ownerUser}
            />
          ) : null}
        </Top>
        <Bottom>
          <Author ownerUser={ownerUser} isSmall={true} />
          <Voter
            canVote={canVote}
            didVote={didVote}
            upvoteCount={upvoteCount}
            onUpvoteClick={instrumentedOnUpvoteClick}
          />
        </Bottom>
      </VizPreviewFooter>
      {isPrivate ? (
        <PrivacyNotice owner={ownerUser} isVizPreview={true} />
      ) : null}
    </Wrapper>
  );
};
