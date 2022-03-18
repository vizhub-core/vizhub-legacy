import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { useShareDBConnection } from './useShareDBConnection';
import { VIZ_INFO_COLLECTION } from 'vizhub-interactors/constants';

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
      // TODO ingest snapshots, verify.
      // TODO unify definition of this query with the one in server.js
      const query = shareDBConnection.createSubscribeQuery(
        VIZ_INFO_COLLECTION,
        {},
        {},
        (error) => {
          // TODO verify that error handling works.
          if (error) {
            console.log(
              'TODO verify that error handling works for invalid subscribe query.'
            );
            throw error;
          }
        }
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

  return vizInfos.map(({ id, title }) => (
    <a key={id} href={`testUser/${id}`}>
      {title}
    </a>
  ));

  //return (
  // TODO fire onScrollToBottom
  //  <HomePage onScrollToBottom={requestNextPage}/>
  //);
};
