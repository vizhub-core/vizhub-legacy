import React from 'react';
import { Wrapper } from './styles';

export const CodeAreaTextarea = ({ text, onTextChange }) => (
  <Wrapper
    value={text}
    onChange={event => {
      onTextChange(event.target.value);
    }}
  />
);
