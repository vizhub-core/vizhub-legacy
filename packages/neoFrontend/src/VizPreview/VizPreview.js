import React from 'react';
import {
  getUserName,
  getUpvoteCount,
  isVizInfoPrivate,
} from 'vizhub-presenters';
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
        <Top>
          <VizPreviewTitle to={link}>{title}</VizPreviewTitle>
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
            onUpvoteClick={onUpvoteClick}
          />
        </Bottom>
      </VizPreviewFooter>
      {isPrivate ? <PrivacyNotice isVizPreview={true} /> : null}
    </Wrapper>
  );
};
