import React, { useState, useEffect, useCallback } from 'react';
import useDebounce from '../../../useDebounce';

export const Input = ({ value, onChange }) => {
  const [current, setCurrent] = useState(value);
  const debouncedValue = useDebounce(current, 800);

  useEffect(() => {
    // skip update if value is the same
    if (value !== debouncedValue) {
      onChange(debouncedValue);
    }
  }, [value, debouncedValue, onChange]);

  return (
    <input
      type="number"
      value={current}
      onChange={useCallback(({ target: { value } }) => setCurrent(value), [
        setCurrent
      ])}
    />
  );
};
