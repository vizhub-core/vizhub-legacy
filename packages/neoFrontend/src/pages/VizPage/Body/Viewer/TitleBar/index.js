import React from 'react';
import { Wrapper, Title } from './styles';
import { Voter } from '../../../../../Voter';

export const TitleBar = ({
  title,
  ...voterProps
}) => (
  <Wrapper>
    <Title>{title}</Title>
    <Voter {...voterProps} />
  </Wrapper>
);
