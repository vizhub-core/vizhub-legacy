import React from 'react';
import { Wrapper, ForkedFromViz } from './styles';
import { SmallText } from '../styles';

export const ForkedFrom = () => (
  <Wrapper>
    <SmallText>Forked from:</SmallText>
    <ForkedFromViz />
  </Wrapper>
);
