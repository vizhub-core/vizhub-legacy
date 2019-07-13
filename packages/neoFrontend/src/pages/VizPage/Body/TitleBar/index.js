import React from 'react';
import { Wrapper, Title, Voter, VoteIcon } from './styles';
import { VoteSVG } from '../../../../svg';

export const TitleBar = () => (
  <Wrapper>
    <Title>Let's make a bar chart</Title>
    <Voter>
      <VoteIcon leftmost={true}>
        <VoteSVG />
      </VoteIcon>
      36
      <VoteIcon>
        <VoteSVG down={true} />
      </VoteIcon>
      6
    </Voter>
  </Wrapper>
);
