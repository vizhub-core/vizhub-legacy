import React, { useState, useEffect, useCallback } from 'react';
import useDebounce from '../../../../useDebounce';
import { Wrapper } from './styles';

export const Input = ({ value, onChange, id }) => {
  const [current, setCurrent] = useState(value);
  const debouncedValue = useDebounce(current, 800);

  useEffect(() => {
    // skip update if value is the same
    if (value !== debouncedValue) {
      onChange(debouncedValue);
    }
  }, [value, debouncedValue, onChange]);

  return (
    <Wrapper
      value={current}
      onChange={useCallback(({ target: { value } }) => setCurrent(value), [
        setCurrent
      ])}
      id={id}
    />
  );
};
