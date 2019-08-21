import React from 'react';
import { VoteSVG } from '../../../../../svg';
import { showUpvote, showDownvote } from '../../../../../featureFlags';
import { Wrapper, Title, Voter, VoteIcon } from './styles';

export const TitleBar = ({ title }) => (
  <Wrapper>
    <Title>{title}</Title>
    <Voter>
      {showUpvote ? (
        <>
          <VoteIcon leftmost={true}>
            <VoteSVG />
          </VoteIcon>
          36
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
