import { useEffect } from 'react';

// Close the menu if the user clicks anywhere else on the page.
export const useCloseOnGlobalClick = (open, close) => {
  useEffect(() => {
    if (open) {
      document.addEventListener('click', close);
      return () => {
        document.removeEventListener('click', close);
      };
    }
  }, [open, close]);
};
