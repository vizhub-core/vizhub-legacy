import React from 'react';
import { Wrapper, Label } from './styles';
import { LockSVG } from '../../../../../../svg';

export const PrivacyNotice = () => (
  <Wrapper>
    <Label>PRIVATE</Label>
    <LockSVG fill="white" />
  </Wrapper>
);
