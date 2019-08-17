import { useEffect, useMemo } from 'react';
import { Subject, BehaviorSubject } from 'rxjs';
import { useVizContentDoc } from './useVizContentDoc';

export const useViz = initialViz => {
  const vizContentDoc = useVizContentDoc(initialViz.id);

  console.log({ initialViz });

  // Display initial viz until realtime connection has been established.
  const viz$ = useMemo(() => new BehaviorSubject(initialViz), [initialViz]);

  const vizContentOp$ = useMemo(() => new Subject(), []);

  // Connect to ShareDB doc for realtime connection.
  useEffect(() => {
    if (!vizContentDoc) {
      return;
    }

    // Update on each change.
    const handleOp = (op, originatedLocally) => {
      const viz = viz$.getValue();
      const previousContent = viz.content;
      const nextContent = vizContentDoc.data;

      if (previousContent !== nextContent) {
        viz$.next({
          info: viz.info,
          content: nextContent
        });
      }

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

  const submitVizContentOp = useMemo(() => {
    if (vizContentDoc) {
      return op => vizContentDoc.submitOp(op);
    }
    return undefined;
  }, [vizContentDoc]);

  return { viz$, submitVizContentOp, vizContentOp$ };
};
