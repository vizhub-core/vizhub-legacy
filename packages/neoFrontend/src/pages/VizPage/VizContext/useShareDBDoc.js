import { useEffect, useState, useContext } from 'react';
import { ConnectionContext } from '../ConnectionContext';

export const useShareDBDoc = (collection, id) => {
  const connection = useContext(ConnectionContext);

  const [vizContentDoc, setVizContentDoc] = useState(null);

  useEffect(() => {
    if (!connection) return;

    // Clear out old doc in case id changed.
    // (don't want the user to see stale stuff).
    setVizContentDoc(null);

    const doc = connection.get(collection, id);

    // Wait until subscribe finishes before passing this out,
    // so that downstream code can assume data is present
    // and that submitOp will work.
    doc.subscribe(() => {
      setVizContentDoc(doc);
    });

    return () => {
      doc.unsubscribe();
    };
  }, [connection, id]);

  return vizContentDoc;
};
