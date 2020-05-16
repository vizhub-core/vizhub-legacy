import { useMemo, useCallback } from 'react';

export const useSubmitPresence = (presence) => {
  const localPresence = useMemo(() => {
    if (!presence) return;
    return presence.create();
  }, [presence]);

  return useCallback(
    (presenceObject) => {
      if (!localPresence) return;
      localPresence.submit(presenceObject, (error) => {
        if (error) throw error;
      });
    },
    [localPresence]
  );
};
