import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper, Label } from './styles';
import { LockSVG } from '../svg';

export const PrivacyNotice = ({ owner, isVizPreview }) => (
  <Link to={`/${owner.userName}?section=private`}>
    <Wrapper isVizPreview={isVizPreview}>
      <Label>PRIVATE</Label>
      <LockSVG height={20} fill="white" />
    </Wrapper>
  </Link>
)
