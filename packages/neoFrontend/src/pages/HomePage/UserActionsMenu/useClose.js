import { useCallback } from 'react';

export const useClose = setOpen =>
  useCallback(() => {
    setOpen(false);
  }, [setOpen]);
