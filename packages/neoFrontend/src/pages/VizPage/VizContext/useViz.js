import { useEffect, useMemo, useCallback } from 'react';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT_CONTENT, DOCUMENT_INFO } from 'vizhub-database';
import { useShareDBDoc } from './useShareDBDoc';
import { useOpStream } from './useOpStream';
import { usePresence } from './usePresence';
import { usePresenceStream } from './usePresenceStream';
import { useSubmitOp } from './useSubmitOp';
import { useSubmitPresence } from './useSubmitPresence';

export const useViz = (initialViz) => {
  const vizContentDoc = useShareDBDoc(DOCUMENT_CONTENT, initialViz.id);
  const vizInfoDoc = useShareDBDoc(DOCUMENT_INFO, initialViz.id);

  // Display initial viz until realtime connection has been established.
  const viz$ = useMemo(() => new BehaviorSubject(initialViz), [initialViz]);

  const getPreviousContent = useCallback(() => viz$.getValue().content, [viz$]);
  const vizContentOp$ = useOpStream(vizContentDoc, getPreviousContent);

  const getPreviousInfo = useCallback(() => viz$.getValue().info, [viz$]);
  const vizInfoOp$ = useOpStream(vizInfoDoc, getPreviousInfo);

  // Update viz$ content.
  useEffect(() => {
    const subscription = vizContentOp$.subscribe(({ previous, next }) => {
      if (previous !== next) {
        viz$.next({
          info: viz$.getValue().info,
          content: next,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [viz$, vizContentOp$]);

  // Update viz$ info.
  useEffect(() => {
    const subscription = vizInfoOp$.subscribe(({ previous, next }) => {
      if (previous !== next) {
        viz$.next({
          content: viz$.getValue().content,
          info: next,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [viz$, vizInfoOp$]);

  const submitVizContentOp = useSubmitOp(vizContentDoc);
  const submitVizInfoOp = useSubmitOp(vizInfoDoc);

  // Manage presence.
  const vizContentPresence = usePresence(
    vizContentDoc,
    DOCUMENT_CONTENT,
    initialViz.id
  );
  const vizContentPresence$ = usePresenceStream(vizContentPresence);
  const submitVizContentPresence = useSubmitPresence(vizContentPresence);

  // TODO pass this into CodeMirror for rendering.
  useEffect(() => {
    const subscription = vizContentPresence$.subscribe((presenceObject) => {
      console.log('got presenceObject');
      console.log(presenceObject);
    });
    return () => subscription.unsubscribe();
  }, [vizContentPresence$]);

  return {
    viz$,
    submitVizContentOp,
    submitVizInfoOp,
    vizContentOp$,
    vizContentPresence$,
    submitVizContentPresence,
  };
};
