import React, { useCallback } from 'react';
import { Wrapper } from './styles';

export const Input = ({
  value,
  placeholder,
  onChange,
  id,
  size = 'large',
  autoSelect,
}) => {
  const handleChange = useCallback(({ target: { value } }) => onChange(value), [
    onChange,
  ]);

  const handleFocus = useCallback(
    autoSelect ? (event) => event.target.select() : () => {},
    [autoSelect]
  );

  return (
    <Wrapper
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      id={id}
      size={size}
      placeholder={placeholder}
    />
  );
};
