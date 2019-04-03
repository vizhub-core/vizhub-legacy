import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper, ForkedFromViz } from './styles';
import { SmallText } from '../styles';

export const ForkedFrom = () => (
  <Wrapper>
    <SmallText>Forked from:</SmallText>
    <Link to="/someuser/dt54">
      <ForkedFromViz />
    </Link>
  </Wrapper>
);
