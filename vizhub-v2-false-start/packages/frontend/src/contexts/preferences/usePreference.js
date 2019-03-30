import { useState, useEffect } from 'react';
export const usePreference = (key, gateway) => {
  const [value, setValue] = useState(gateway.get(key));
  useEffect(() => {
    const listener = changed => {
      if (changed === key) {
        setValue(gateway.get(key));
      }
    };
    gateway.on('change', listener);
    return () => {
      gateway.off('change', listener);
    };
  }, []);
  return [value, gateway.set(key)];
};
