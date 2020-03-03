import React, { useCallback } from 'react';
import { Wrapper } from './styles';

export const Input = ({ value, onChange, id }) => {
  const handleChange = useCallback(({ target: { value } }) => onChange(value), [
    onChange
  ]);

  return <Wrapper value={value} onChange={handleChange} id={id} />;
};
