import { useEffect, useState, useContext, useCallback } from 'react';
import { ConnectionContext } from '../ConnectionContext';
import { WarningContext } from '../WarningContext';

export const useShareDBDoc = (collection, id) => {
  const connection = useContext(ConnectionContext);
  const { setWarning } = useContext(WarningContext);

  const [vizContentDoc, setVizContentDoc] = useState(null);

  const onError = useCallback(error => {
    setWarning(error.message);
  }, [setWarning]);

  useEffect(() => {
    if (!connection) return;

    // Clear out old doc in case id changed.
    // (don't want the user to see stale stuff).
    setVizContentDoc(null);

    const doc = connection.get(collection, id, err => {
      console.log('hered');
    });
    doc.on('error', onError);

    // Wait until subscribe finishes before passing this out,
    // so that downstream code can assume data is present
    // and that submitOp will work.
    doc.subscribe(() => {
      setVizContentDoc(doc);
    });

    return () => {
      doc.off('error', onError);
      doc.unsubscribe();
    };
  }, [connection, collection, id, onError]);

  return vizContentDoc;
};
