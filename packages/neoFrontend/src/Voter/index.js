import React from 'react';
import { showUpvote, showDownvote } from '../featureFlags';
import { PrivacyNotice } from '../PrivacyNotice';
import { VoteSVG } from '../svg';
import { Container, VoteIcon } from './styles';

export const Voter = ({
  upvoteCount,
  onUpvoteClick,
  canVote,
  didVote,
  isPrivate,
}) => (
  <Container>
    {showUpvote ? (
      <>
        <VoteIcon
          leftmost={true}
          onClick={onUpvoteClick}
          canVote={canVote}
          title={
            canVote
              ? didVote
                ? 'Remove upvote'
                : 'Upvote'
              : 'Sign in to upvote.'
          }
        >
          <VoteSVG didVote={didVote} />
        </VoteIcon>
        {upvoteCount}
      </>
    ) : null}
    {showDownvote ? (
      <>
        <VoteIcon>
          <VoteSVG down={true} />
        </VoteIcon>
        6
      </>
    ) : null}
    {isPrivate ? <PrivacyNotice /> : null}
  </Container>
);
