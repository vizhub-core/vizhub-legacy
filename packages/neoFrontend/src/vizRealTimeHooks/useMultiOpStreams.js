import { useMemo, useEffect } from 'react';
import { Subject } from 'rxjs';
import { useSameRef } from '../useSameRef';

// Subscribes to a ShareDB document for ops,
// returns an RxJS Subject that emits values for each op.
export const useMultiOpStreams = (shareDBDocsToTrack = [], getPrevious) => {
  const shareDBDocs = useSameRef(shareDBDocsToTrack);

  const ops$ = useMemo(() => {
    return shareDBDocs.map(({ id }) => [id, new Subject()]);
  }, [shareDBDocs]);

  // Connect to ShareDB doc for realtime connection.
  useEffect(() => {
    let opHandlers = [];

    if (ops$.length === 0) {
      return;
    }

    opHandlers = ops$.map(([id, op$], index) => {
      const shareDBDoc = shareDBDocs[index];

      // Update on each change.
      const handleOp = (op, originatedLocally) => {
        const previous = getPrevious(id);
        const next = shareDBDoc.data;

        op$.next({ previous, next, op, originatedLocally });
      };

      return [shareDBDoc, handleOp];
    });

    opHandlers.forEach(([doc, handleOp]) => {
      doc.on('op', handleOp);
    });

    return () => {
      opHandlers.forEach(([doc, handleOp]) => {
        doc.on('op', handleOp);
      });
    };
  }, [shareDBDocs, ops$, getPrevious]);

  return ops$;
};
