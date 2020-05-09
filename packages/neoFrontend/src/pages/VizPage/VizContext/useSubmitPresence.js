import { useMemo, useCallback } from 'react';

export const useSubmitPresence = (presence) => {
  const localPresence = useMemo(() => {
    if (!presence) return;
    // TODO continue working on presence from here.
    //return presence.create();
  }, [presence]);

  return useCallback(
    (range) => {
      if (!localPresence) return;
      localPresence.submit(range, (error) => {
        if (error) throw error;
      });
    },
    [localPresence]
  );
};
