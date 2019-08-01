import React from 'react';
import { Wrapper } from './styles';

export const CodeAreaTextarea = ({
  file: { name, text },
  onTextChange,
  allowEditing
}) => (
  <Wrapper
    value={text}
    onChange={event => {
      onTextChange(event.target.value);
    }}
    readOnly={!allowEditing}
  />
);
