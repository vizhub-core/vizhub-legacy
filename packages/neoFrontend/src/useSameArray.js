import { useEffect, useRef, useMemo } from 'react';

const oneDimensionalArraysEquals = (arrayA, arrayB) => {
  if (Object.is(arrayA, arrayB)) {
    return true;
  }

  if (arrayA.length !== arrayB.length) {
    return false;
  }

  for (let i = 0; i < arrayA.length; i++) {
    if (arrayA[i] !== arrayB[i]) {
      return false;
    }
  }

  return true;
};

export const useSameArray = (value, equals = oneDimensionalArraysEquals) => {
  const valueRef = useRef(value);

  const sameArray = useMemo(() => {
    // isEqual might be expensive, no need to compute it at all if arrays referentially the same
    return equals(value, valueRef.current);
  }, [value, equals]);

  useEffect(() => {
    if (!sameArray) {
      valueRef.current = value;
    }
  }, [sameArray, valueRef, value]);

  // if value changed return it, if it is the same return stored value
  return sameArray ? valueRef.current : value;
};
