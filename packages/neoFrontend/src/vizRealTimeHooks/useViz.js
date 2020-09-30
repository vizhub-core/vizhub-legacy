import { useEffect, useMemo, useCallback } from 'react';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT_CONTENT } from 'vizhub-database';
import { useShareDBDoc } from './useShareDBDoc';
import { useOpStream } from './useOpStream';
import { usePresence } from './usePresence';
import { usePresenceStream } from './usePresenceStream';
import { useSubmitOp } from './useSubmitOp';
import { useSubmitPresence } from './useSubmitPresence';
import { useVizInfo } from './useVizInfo';
import { usePending } from './usePending';

export const useViz = (initialViz) => {
  const { vizInfo$, submitVizInfoOp } = useVizInfo(initialViz.info);

  const vizContentDoc = useShareDBDoc(DOCUMENT_CONTENT, initialViz.id);

  // Display initial viz until realtime connection has been established.
  const viz$ = useMemo(() => new BehaviorSubject(initialViz), [initialViz]);

  const getPreviousContent = useCallback(() => viz$.getValue().content, [viz$]);
  const vizContentOp$ = useOpStream(vizContentDoc, getPreviousContent);

  // Update viz$ info.
  useEffect(() => {
    const subscription = vizInfo$.subscribe((vizInfo) => {
      viz$.next({
        id: initialViz.id,
        content: viz$.getValue().content,
        info: vizInfo,
      });
    });
    return () => subscription.unsubscribe();
  }, [viz$, vizInfo$, initialViz.id]);

  // Update viz$ content.
  useEffect(() => {
    const subscription = vizContentOp$.subscribe(({ previous, next }) => {
      if (previous !== next) {
        viz$.next({
          id: initialViz.id,
          info: vizInfo$.getValue(),
          content: next,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [viz$, vizInfo$, vizContentOp$, initialViz.id]);

  const submitVizContentOp = useSubmitOp(vizContentDoc);
  const pending = usePending(vizContentDoc);

  // Manage presence.
  const vizContentPresence = usePresence(
    vizContentDoc,
    DOCUMENT_CONTENT,
    initialViz.id
  );
  const vizContentPresence$ = usePresenceStream(vizContentPresence);
  const submitVizContentPresence = useSubmitPresence(vizContentPresence);

  return {
    viz$,
    pending,
    submitVizContentOp,
    submitVizInfoOp,
    vizContentOp$,
    vizContentPresence$,
    submitVizContentPresence,
  };
};
