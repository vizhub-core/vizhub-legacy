import React from 'react';
import { Wrapper } from './styles';

export const CodeAreaTextarea = ({ text }) => (
  <Wrapper
    value={text}
    onChange={() => {
      console.log('record the change');
    }}
  />
);
