import React from 'react';
import { VoteSVG } from '../../../../../svg';
import { showUpvote, showDownvote } from '../../../../../featureFlags';
import { Wrapper, Title, Voter, VoteIcon } from './styles';

export const TitleBar = ({ title, upvoteCount, onUpvoteClick, canVote }) => (
  <Wrapper>
    <Title>{title}</Title>
    <Voter>
      {showUpvote ? (
        <>
          <VoteIcon
            leftmost={true}
            onClick={onUpvoteClick}
            canVote={canVote}
            title={canVote ? undefined : 'Sign in to upvote.'}
          >
            <VoteSVG />
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
    </Voter>
  </Wrapper>
);
