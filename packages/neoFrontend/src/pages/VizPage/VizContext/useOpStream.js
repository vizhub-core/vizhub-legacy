import { useMemo, useEffect } from 'react';
import { Subject } from 'rxjs';

// Subscribes to a ShareDB document for ops,
// returns an RxJS Subject that emits values for each op.
export const useOpStream = (shareDBDoc, getPrevious) => {
  const op$ = useMemo(() => new Subject(), []);

  // Connect to ShareDB doc for realtime connection.
  useEffect(() => {
    if (!shareDBDoc) {
      return;
    }

    // Update on each change.
    const handleOp = (op, originatedLocally) => {
      const previous = getPrevious();
      const next = shareDBDoc.data;
      op$.next({ previous, next, op, originatedLocally });
    };

    shareDBDoc.on('op', handleOp);

    return () => {
      shareDBDoc.off('op', handleOp);
    };
  }, [shareDBDoc, op$, getPrevious]);

  return op$;
};
