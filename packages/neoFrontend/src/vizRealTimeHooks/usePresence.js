import { useEffect, useState } from 'react';

export const usePresence = (shareDBDoc, collection, id) => {
  const [presence, setPresence] = useState();

  useEffect(() => {
    if (!shareDBDoc) {
      return;
    }
    setPresence(shareDBDoc.connection.getDocPresence(collection, id));
  }, [shareDBDoc, collection, id]);

  return presence;
};
