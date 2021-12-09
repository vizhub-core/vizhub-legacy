import { useState, useEffect, useCallback, useRef } from 'react';

import { runDelay } from '../constants';

export const usePending = (shareDBDoc) => {
  const lastOpTimerRef = useRef();
  const [pending, setPending] = useState(false);

  const resetOnNoPending = useCallback(() => {
    if (!shareDBDoc) return;

    shareDBDoc.whenNothingPending(() => {
      setPending(false);
    });
  }, [shareDBDoc, setPending]);

  useEffect(() => {
    if (!shareDBDoc) return;

    shareDBDoc.on('before op', () => {
      setPending(true);

      clearTimeout(lastOpTimerRef.current);

      lastOpTimerRef.current = setTimeout(() => {
        // should be triggered only once, cause upcoming ops unschedule previous resetOnNoPending
        resetOnNoPending();
      }, runDelay);
    });
  }, [shareDBDoc, resetOnNoPending]);

  return pending;
};
