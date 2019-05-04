import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper, ForkedFromViz } from './styles';
import { SmallText } from '../styles';

export const ForkedFrom = ({ forkedFromVizId, forkedFromUserData }) =>
  forkedFromVizId ? (
    <Wrapper>
      <SmallText>Forked from:</SmallText>
      <Link to={`/${forkedFromUserData.username}/${forkedFromVizId}`}>
        <ForkedFromViz />
      </Link>
    </Wrapper>
  ) : null;
