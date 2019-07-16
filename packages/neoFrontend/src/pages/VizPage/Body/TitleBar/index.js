import React from 'react';
import { VoteSVG } from '../../../../svg';
import { Wrapper, Title, Voter, VoteIcon } from './styles';

export const TitleBar = ({title}) => (
  <Wrapper>
    <Title>{title}</Title>
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
