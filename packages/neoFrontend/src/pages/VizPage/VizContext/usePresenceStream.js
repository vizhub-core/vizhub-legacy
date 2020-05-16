import { useMemo, useEffect } from 'react';
import { Subject } from 'rxjs';

// Subscribes to a ShareDB document for presence changes.
// Returns an RxJS Subject that emits values for each op.
export const usePresenceStream = (presence) => {
  const presence$ = useMemo(() => new Subject(), []);

  useEffect(() => {
    if (!presence) return;

    presence.subscribe(function (error) {
      if (error) throw error;
    });

    // Update on each change.
    const handleReceive = (id, presenceObject) => {
      presence$.next(presenceObject);
    };

    presence.on('receive', handleReceive);

    return () => {
      presence.off('receive', handleReceive);
    };
  }, [presence, presence$]);

  return presence$;
};
