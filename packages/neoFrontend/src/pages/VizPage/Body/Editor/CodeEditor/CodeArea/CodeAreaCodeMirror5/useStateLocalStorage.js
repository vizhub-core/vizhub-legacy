import { useState, useCallback, useEffect } from 'react';
export const useStateLocalStorage = (property, defaultValue) => {
  const [state, setState] = useState(defaultValue);

  useEffect(() => {
    const localStorageState = localStorage.getItem(property);
    if (localStorageState !== null) {
      setState(localStorageState);
    }
  }, [property]);

  const setValue = useCallback(
    value => {
      localStorage.setItem(property, value);
      setState(value);
    },
    [property]
  );

  return [state, setValue];
};
