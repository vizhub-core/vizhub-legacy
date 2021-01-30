import React from 'react';
import { showUpvote, showDownvote } from '../featureFlags';
import { VoteSVG } from '../svg';
import { Container, VoteIcon } from './styles';

export const Voter = ({
  upvoteCount,
  onUpvoteClick,
  canVote,
  didVote,
  usersWhoUpvoted,
  whyCantUpvote = 'Sign in to upvote.',
  extension = null
}) => (
  <Container title={usersWhoUpvoted}>
    {showUpvote ? (
      <>
        <VoteIcon
          leftmost={true}
          onClick={onUpvoteClick}
          canVote={canVote}
          title={
            canVote ? (didVote ? 'Remove upvote' : 'Upvote') : whyCantUpvote
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
    {extension}
  </Container>
);
