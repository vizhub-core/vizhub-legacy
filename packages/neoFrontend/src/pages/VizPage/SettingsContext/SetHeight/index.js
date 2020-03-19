import React from 'react';
import { Input } from '../../../../Input';
import { Label } from './styles';
import { FormRow } from '../../styles';

export const SetHeight = ({ height, setHeight }) => (
  <FormRow>
    <Input id="set-height-input" value={height} onChange={setHeight} />
    <Label htmlFor="set-height-input">pixels</Label>
  </FormRow>
);
