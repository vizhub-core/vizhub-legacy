import { useEffect, useMemo, useCallback } from 'react';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT_INFO } from 'vizhub-database';
import { useShareDBDoc } from './useShareDBDoc';
import { useOpStream } from './useOpStream';
import { useSubmitOp } from './useSubmitOp';

export const useVizInfo = (initialVizInfo) => {
  const vizInfoDoc = useShareDBDoc(DOCUMENT_INFO, initialVizInfo.id);

  // Display initial viz until realtime connection has been established.
  const vizInfo$ = useMemo(() => new BehaviorSubject(initialVizInfo), [
    initialVizInfo,
  ]);

  const getPreviousInfo = useCallback(() => vizInfo$.getValue().info, [
    vizInfo$,
  ]);
  const vizInfoOp$ = useOpStream(vizInfoDoc, getPreviousInfo);

  // Update viz$ info.
  useEffect(() => {
    const subscription = vizInfoOp$.subscribe(({ previous, next }) => {
      if (previous !== next) {
        vizInfo$.next(next);
      }
    });
    return () => subscription.unsubscribe();
  }, [vizInfo$, vizInfoOp$, initialVizInfo.id]);

  const submitVizInfoOp = useSubmitOp(vizInfoDoc);

  return {
    vizInfo$,
    submitVizInfoOp,
  };
};
