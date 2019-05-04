import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper, ForkedFromViz } from './styles';
import { SmallText } from '../styles';

export const ForkedFrom = ({ forkedFromVizId, forkedFromUserId }) =>
  forkedFromVizId ? (
    <Wrapper>
      <SmallText>Forked from:</SmallText>
      <Link to={`/${forkedFromUserId}/${forkedFromVizId}`}>
        <ForkedFromViz />
      </Link>
    </Wrapper>
  ) : null;
