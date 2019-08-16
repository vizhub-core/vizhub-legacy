import { useEffect, useState, useContext } from 'react';
import { ConnectionContext } from '../ConnectionContext';

// TODO reduce duplication between here and packages/database/src/collectionName.js
export const DOCUMENT_CONTENT = 'documentContent';

export const useVizContentDoc = vizId => {
  const connection = useContext(ConnectionContext);

  const [vizContentDoc, setVizContentDoc] = useState(null);

  useEffect(() => {
    if (!connection) return;

    // Clear out old doc in case vizId changed.
    // (don't want the user to see stale stuff).
    setVizContentDoc(null);

    const doc = connection.get(DOCUMENT_CONTENT, vizId);

    // Wait until subscribe finishes before passing this out,
    // so that downstream code can assume data is present
    // and that submitOp will work.
    doc.subscribe(() => {
      setVizContentDoc(doc);
    });

    return () => {
      doc.unsubscribe();
    };
  }, [connection, vizId]);

  return vizContentDoc;
};
