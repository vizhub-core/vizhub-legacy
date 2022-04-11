import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from 'react';
import { VIZ_INFO_COLLECTION } from 'vizhub-interactors/constants';
import { HomePage } from '../ui';
import { useShareDBConnection } from './useShareDBConnection';
import { logShareDBError } from './logShareDBError';
import { homePageVizInfosQuery } from '../HomePage';

// State machine
// SETTLED --> NEXT_PAGE_REQUESTED --|
//    |------<-----------------------|
const SETTLED = 'SETTLED';
const NEXT_PAGE_REQUESTED = 'NEXT_PAGE_NEEDED';

const reducer = (state, action, dispatch) => {
  switch (action.type) {
    case 'RequestNextPage':
      return { ...state, nextPageStatus: NEXT_PAGE_REQUESTED };
    case 'ResolveNextPage':
      return {
        ...state,
        nextPageStatus: SETTLED,
        numPages: state.numPages + 1,
      };
    case 'UpdateVizInfos':
      const pages = [...state.pages];
      pages[action.pageIndex] = action.vizInfos;
      return { ...state, pages };
    default:
      throw new Error('This should never happen.');
  }
};

// This hook sets up a live updating representation of VizInfo query results.
export const useVizInfos = ({
  pageData: { vizInfoSnapshots },
  shareDBConnection,
}) => {
  const initialPaginationState = useMemo(
    () => ({
      // Initialize the viz from server rendered snapshot data.
      pages: [vizInfoSnapshots.map((snapshot) => snapshot.data)],
      numPages: 0,
      nextPageStatus: SETTLED,
    }),
    [vizInfoSnapshots]
  );

  const [paginationState, paginationDispatch] = useReducer(
    reducer,
    initialPaginationState
  );

  const requestNextPage = useCallback(() => {
    // If the next page is requested again before the first request resolves,
    // do nothing (wait for the first request resolve);
    if (paginationState.nextPageStatus === NEXT_PAGE_REQUESTED) {
      return;
    }

    const { numPages } = paginationState;
    const pageIndex = numPages;
    paginationDispatch({ type: 'RequestNextPage' });

    if (shareDBConnection) {
      const options = {};

      // For the first page only, ingest snapshots and pre-populate results.
      if (pageIndex === 0) {
        // Verified manually that results option is working 3/19/22.
        // For details see https://github.com/share/sharedb/pull/546
        //
        // To verify, comment out the following `results` option field,
        // refresh, in Chrome DevTools look in WebSocket (WS) section,
        // observe that a message is sent back with the entire vizInfo doc.
        // The message looks like `data: [{v: 7,…}, {v: 5,…}, {v: 1,…}]`.
        // This is not what we want, since we already transferred that data.
        //
        // Uncomment the following `results` option field and observe that
        // the message with the entire query results is never sent, only the updates are.
        // When `results` is populated, the WS message looks like this:
        // `a: [["viz0.798763221841988", 10], ["viz0.7951069903628012", 3],...`
        // Note that it only contains versions, not full snapshots, which is what we want.
        options.results = vizInfoSnapshots.map((vizInfoSnapshot) => {
          const { id } = vizInfoSnapshot.data;
          const vizInfoDoc = shareDBConnection.get(VIZ_INFO_COLLECTION, id);

          // It "works" without the following line, but transfers data for each doc.
          vizInfoDoc.ingestSnapshot(vizInfoSnapshot, logShareDBError);

          return vizInfoDoc;
        });
      }

      const query = shareDBConnection.createSubscribeQuery(
        VIZ_INFO_COLLECTION,
        homePageVizInfosQuery(pageIndex),
        options,
        logShareDBError
      );

      // Process real time updates by updating state.
      const update = () => {
        paginationDispatch({
          type: 'UpdateVizInfos',
          pageIndex,
          vizInfos: query.results.map((doc) => doc.data),
        });
      };

      // handleQueryChange gets invoked if a doc is added/removed
      // from the results, or if the results shift (e.g. pagination
      // page 2 shifts if something is added/removed from page 1).
      // TODO verify behavior of shifting.
      let oldQueryResults;
      const handleQueryChange = () => {
        // Remove old listeners so we don't end up with
        // multiple listeners on each doc that do the same thing.
        if (oldQueryResults) {
          for (const doc of oldQueryResults) {
            doc.off('load', update);
            doc.off('op', update);
          }
        }

        // Listen for changes on each doc individually.
        // Inspired by https://github.com/share/sharedb/blob/master/examples/leaderboard/client/Player.jsx#L19
        for (const doc of query.results) {
          doc.on('load', update);
          doc.on('op', update);
        }

        // Stash the query results for future cleanup of listeners.
        oldQueryResults = query.results;
      };

      query.on('ready', () => {
        paginationDispatch({ type: 'ResolveNextPage' });
        handleQueryChange();
      });
      query.on('changed', handleQueryChange);
    }
  }, [
    paginationDispatch,
    shareDBConnection,
    paginationState.nextPageStatus,
    paginationState.numPages,
  ]);

  // Subscribe to the first page (special case).
  useEffect(() => {
    if (
      shareDBConnection &&
      paginationState.numPages === 0 &&
      paginationState.nextPageStatus === 'SETTLED'
    ) {
      console.log('Requesting first page');
      requestNextPage();
    }
    // Note that dependencies here are intentionally blank
  }, [shareDBConnection, paginationState]);

  return { vizInfosPages: paginationState.pages, requestNextPage };
};
