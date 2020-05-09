import React from 'react';
import { Wrapper, Label } from './styles';
import { LockSVG } from '../svg';

export const PrivacyNotice = ({ isVizPreview }) => (
  <Wrapper isVizPreview={isVizPreview}>
    <Label>PRIVATE</Label>
    <LockSVG height={20} fill="white" />
  </Wrapper>
);
