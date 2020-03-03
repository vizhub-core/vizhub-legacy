import React from 'react';
import { Input } from '../Input';
import { Wrapper, Label } from './styles';

export const SetHeight = ({ height, setHeight }) => (
  <Wrapper>
    <Input id="set-height-input" value={height} onChange={setHeight} />
    <Label htmlFor="set-height-input">pixels</Label>
  </Wrapper>
);
