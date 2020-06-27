import { useEffect, useState, useContext, useCallback } from 'react';
import { useSameRef } from '../useSameRef';
import { ConnectionContext } from '../ConnectionContext';
import { WarningContext } from '../WarningContext';

const RESET_DOCS = [];

export const useShareDBQuery = (collection, idsToTrack = []) => {
  const ids = useSameRef(idsToTrack);

  const connection = useContext(ConnectionContext);
  const { setWarning } = useContext(WarningContext);

  const [shareDBDocs, setShareDBDocs] = useState([]);

  const onError = useCallback(
    (error) => {
      setWarning(error.message);
    },
    [setWarning]
  );

  // Manage docs subscription.
  useEffect(() => {
    let query = null;

    if (!connection || ids.length === 0) return;

    // Clear out old doc in case ids changed.
    // (don't want the user to see stale stuff).
    setShareDBDocs(RESET_DOCS);

    query = connection.createSubscribeQuery(
      collection,
      { id: { $in: ids } },
      null,
      (err, docs) => {
        setShareDBDocs(docs);
      }
    );

    query.on('error', onError);

    return () => {
      query && query.destroy();
    };
  }, [connection, collection, ids, onError]);

  return shareDBDocs;
};
