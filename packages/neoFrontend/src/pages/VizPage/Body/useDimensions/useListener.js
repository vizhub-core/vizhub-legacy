import { useEffect } from 'react';

export const useListener = (type, listener, element) => {
  useEffect(() => {
    if (element) {
      element.addEventListener(type, listener);
      return () => {
        element.removeEventListener(type, listener);
      };
    }
  }, [type, listener, element]);
};
