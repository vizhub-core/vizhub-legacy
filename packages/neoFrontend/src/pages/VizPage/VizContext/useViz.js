import { useEffect, useContext, useMemo, useCallback } from 'react';
import { BehaviorSubject } from 'rxjs';
import { RealtimeModulesContext } from '../RealtimeModulesContext';
import { useVizContentDoc } from './useVizContentDoc';
import { reducer } from './reducer';

export const useViz = initialViz => {
  const realtimeModules = useContext(RealtimeModulesContext);

  const vizContentDoc = useVizContentDoc(realtimeModules, initialViz.id);

  // Display initial viz until realtime connection has been established.
  const viz$ = useMemo(() => new BehaviorSubject(initialViz), [initialViz]);

  // Connect to ShareDB doc for realtime connection.
  useEffect(() => {
    if (!vizContentDoc) {
      return;
    }

    const dispatchContentChange = () => {
      viz$.next(
        reducer(viz$.getValue(), {
          type: 'contentChange',
          content: vizContentDoc.data
        })
      );
    };

    // Handle the case that the initial viz and the
    // vizContentDoc content are different.
    dispatchContentChange();

    // Update on each change.
    console.log('subscribing dispatchContentChange');
    vizContentDoc.on('op', dispatchContentChange);

    return () => {
      console.log('unsubscribing from ops');
      vizContentDoc.off('op', dispatchContentChange);
    };
  }, [vizContentDoc, viz$]);

  const submitVizContentOp = useCallback(op => vizContentDoc.submitOp(op), [
    vizContentDoc
  ]);

  return { viz$, submitVizContentOp };
};
