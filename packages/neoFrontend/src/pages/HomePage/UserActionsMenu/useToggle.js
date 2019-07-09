import { useCallback } from 'react';

export const useToggle = (open, setOpen) =>
  useCallback(
    event => {
      setOpen(!open);
    },
    [open, setOpen]
  );
