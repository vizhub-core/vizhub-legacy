import { useEffect, useMemo, useCallback } from 'react';
import { Subject, BehaviorSubject } from 'rxjs';
import { DOCUMENT_CONTENT } from '../../../constants';
import { useShareDBDoc } from './useShareDBDoc';

export const useViz = initialViz => {
  const vizContentDoc = useShareDBDoc(DOCUMENT_CONTENT, initialViz.id);

  // Display initial viz until realtime connection has been established.
  const viz$ = useMemo(() => new BehaviorSubject(initialViz), [initialViz]);

  const vizContentOp$ = useMemo(() => new Subject(), []);

  const getPreviousContent = useCallback(() => viz$.getValue().content, [viz$]);

  // Connect to ShareDB doc for realtime connection.
  useEffect(() => {
    if (!vizContentDoc) {
      return;
    }

    // Update on each change.
    const handleOp = (op, originatedLocally) => {
      const previousContent = getPreviousContent();
      const nextContent = vizContentDoc.data;

      vizContentOp$.next({
        previousContent,
        nextContent,
        op,
        originatedLocally
      });
    };

    vizContentDoc.on('op', handleOp);

    return () => {
      vizContentDoc.off('op', handleOp);
    };
  }, [vizContentDoc, viz$, vizContentOp$]);

  useEffect(() => {
    const subscription = vizContentOp$.subscribe(
      ({ previousContent, nextContent }) => {
        if (previousContent !== nextContent) {
          viz$.next({
            info: viz$.getValue().info,
            content: nextContent
          });
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [viz$, vizContentOp$]);

  const submitVizContentOp = useMemo(() => {
    if (vizContentDoc) {
      return op => vizContentDoc.submitOp(op);
    }
    return undefined;
  }, [vizContentDoc]);

  return { viz$, submitVizContentOp, vizContentOp$ };
};
