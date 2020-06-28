import { useEffect, useMemo, useCallback, useRef } from 'react';
import { BehaviorSubject } from 'rxjs';
import { useSameArray } from '../useSameArray';
import { DOCUMENT_INFO } from 'vizhub-database';
import { useShareDBQuery } from './useShareDBQuery';
import { useMultiOpStreams } from './useMultiOpStreams';
import { useSubmitOp } from './useSubmitOp';

export const useVizInfos = (vizInitialInfosToTrack = []) => {
  // if hook called with same array of infos, than it should use same ref in order not do redundant work
  const vizInitialInfos = useSameArray(vizInitialInfosToTrack);

  // retrieve ids which desired to keep track on
  const vizInfosIds = useMemo(() => vizInitialInfos.map(({ id }) => id), [
    vizInitialInfos,
  ]);

  // get share db docs for interested viz infos
  const vizInfoDocs = useShareDBQuery(DOCUMENT_INFO, vizInfosIds);

  // need to keep track on already initialized viz infos through hooks life, so it:
  // 1) starts faster and do less work
  // 2) prevents cases when hook user provides stale data
  // (for example, home page accumulates pages and earlier page contains viz infos with data that were fresh on initial request)
  const hookLifetimeVizInfosByIdRef = useRef({});

  // map that keeps viz info subjects by ids, so that it would be possible to find related subject if needed
  const vizInfos$ = useMemo(() => {
    const alreadyInitialized = Object.keys(hookLifetimeVizInfosByIdRef.current);

    const addedVizInfosById = vizInitialInfos
      .filter(({ id }) => !alreadyInitialized.includes(id))
      .reduce((vizInfosById, initialInfo) => {
        vizInfosById[initialInfo.id] = new BehaviorSubject(initialInfo);

        return vizInfosById;
      }, {});

    return Object.assign(
      {},
      hookLifetimeVizInfosByIdRef.current,
      addedVizInfosById
    );
  }, [vizInitialInfos]);

  // need to update initialized infos subjects when subjects are recalculated
  useEffect(() => {
    hookLifetimeVizInfosByIdRef.current = vizInfos$;
  }, [vizInfos$]);

  const getPrevious = useCallback((id) => vizInfos$[id].getValue(), [
    vizInfos$,
  ]);
  const vizInfoOps$ = useMultiOpStreams(vizInfoDocs, getPrevious);

  useEffect(() => {
    const subscriptions = vizInfoOps$.map(([id, op$]) => {
      return op$.subscribe(({ previous, next }) => {
        if (previous !== next) {
          vizInfos$[id].next(next);
        }
      });
    });

    return () => {
      subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    };
  }, [vizInfos$, vizInfoOps$]);

  const getVizInfoDoc = useCallback(({ id: target }) => {
    return vizInfoDocs.find(({id}) => id === target);
  }, [vizInfoDocs]);

  const submitVizInfoOp = useSubmitOp(getVizInfoDoc);

  const result = useMemo(() => {
    return { vizInfos$, submitVizInfoOp };
  }, [vizInfos$, submitVizInfoOp]);

  return result;
};
