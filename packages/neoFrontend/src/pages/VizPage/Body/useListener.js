import { useEffect } from 'react';

export const useListener = (type, listener, element = window) => {
  useEffect(() => {
    if (element) {
      element.addEventListener(type, listener);
      return () => {
        element.removeEventListener(type, listener);
      };
    }
  }, [type, listener, element]);
};
