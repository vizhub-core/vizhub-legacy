import { useEffect } from 'react';

// Close the menu if the user clicks anywhere on the page.
export const useCloseOnGlobalClick = (isOpen, close) => {
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', close);
      return () => {
        document.removeEventListener('click', close);
      };
    }
  }, [isOpen, close]);
};
