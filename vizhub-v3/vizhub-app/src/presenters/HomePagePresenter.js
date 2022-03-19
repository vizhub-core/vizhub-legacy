import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { VIZ_INFO_COLLECTION } from 'vizhub-interactors/constants';
import { HomePage } from '../ui';
import { useShareDBConnection } from './useShareDBConnection';
import { logShareDBError } from './logShareDBError';

// This hook sets up a live updating representation of VizInfo query results.
const useVizInfos = ({ vizInfoSnapshots }) => {
  // Initialize the viz from server rendered snapshot data.
  const [vizInfos, setVizInfos] = useState(
    vizInfoSnapshots.map((snapshot) => snapshot.data)
  );

  // Initialize the ShareDB connection via WebSocket.
  const shareDBConnection = useShareDBConnection();

  // In the client only, connect the results to real time updates via ShareDB.
  useEffect(() => {
    if (shareDBConnection) {
      const options = {
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
        results: vizInfoSnapshots.map((vizInfoSnapshot) => {
          const { id } = vizInfoSnapshot.data;
          const vizInfoDoc = shareDBConnection.get(VIZ_INFO_COLLECTION, id);

          // It "works" without the following line, but transfers data for each doc.
          vizInfoDoc.ingestSnapshot(vizInfoSnapshot, logShareDBError);

          return vizInfoDoc;
        }),
      };

      // TODO unify definition of this query with the one in server.js
      const query = shareDBConnection.createSubscribeQuery(
        VIZ_INFO_COLLECTION,
        {},
        options,
        logShareDBError
      );

      // Process real time updates by updating state.
      const update = () => {
        console.log('updating');
        setVizInfos(query.results.map((doc) => doc.data));
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
          // TODO test case of removing a viz to the query results
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

      query.on('ready', handleQueryChange);
      query.on('changed', handleQueryChange);

      // TODO verify that this gets invoked and works properly.
      return () => {
        query.off('ready', handleQueryChange);
        query.off('changed', handleQueryChange);
      };
    }
  }, [shareDBConnection]);

  // TODO handle pagination, infinite scroll
  // TODO optimize infinite scroll by rendering placeholders for offscreen results
  // TODO make dynamically updating thumbnails work (e.g. home page should update in real time)

  // Handle pagination.
  //
  // State machine
  // SETTLED --> NEXT_PAGE_REQUESTED --|
  //    |------<-----------------------|
  const SETTLED = 'SETTLED';
  const NEXT_PAGE_REQUESTED = 'NEXT_PAGE_NEEDED';
  const [paginationState, paginationDispatch] = useReducer((state, action) => {
    switch (action) {
      case 'RequestNextPage':
        // If the next page is requested again before the first request resolves,
        // do nothing (wait for the first request resolve);
        if (state === NEXT_PAGE_REQUESTED) {
          return;
        }
        // TODO make request for next page
        // Simulate request for now
        setTimeout(() => {
          paginationDispatch('NextPageResolved');
        }, 1000);
        return NEXT_PAGE_REQUESTED;
        break;
      case 'NextPageResolved':
        // TODO store the resulting subscribed query somewhere
        return SETTLED;
      default:
        throw new Error('This should never happen.');
    }
  }, SETTLED);

  const requestNextPage = useCallback(() => {
    paginationDispatch('RequestNextPage');
  }, [paginationDispatch]);

  return { vizInfos, requestNextPage };
};

export const HomePagePresenter = ({ pageData }) => {
  const { vizInfos, requestNextPage } = useVizInfos(pageData);

  const vizPreviewsProps = vizInfos.map(({ id, title }) => ({
    id,
    title,
    thumbnailImageURL:
      'https://vizhub.com/api/visualization/thumbnail/76631818791a48909d79d6562177e4dc.png',
    lastUpdatedDateFormatted: 'December 6, 2021',
    ownerName: 'Joe Schmo',
    ownerAvatarURL: 'https://github.com/mdo.png',
  }));

  // Simulate user scrolling.
  useEffect(() => {
    requestNextPage();
  });

  // Working
  //  return vizInfos.map(({ id, title }) => (
  //    <a key={id} href={`testUser/${id}`}>
  //      {title}
  //    </a>
  //  ));

  //TODO fire onScrollToBottom
  return (
    <HomePage
      onScrollToBottom={requestNextPage}
      vizPreviewsProps={vizPreviewsProps}
    />
  );
};
