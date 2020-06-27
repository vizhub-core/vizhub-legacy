import { useEffect, useRef } from 'react';

export const useSameRef = (value) => {
  // initialize ref with first value
  const valueRef = useRef(value);

  // need to update ref if changed
  useEffect(() => {
    if (value !== valueRef.current) {
      valueRef.current = value;
    }
  }, [valueRef, value]);

  // if value changed return it, if it is the same ref return previous
  return value !== valueRef.current ? value : valueRef.current;
};
