// Gets a current snapshot of a ShareDB document.
export const getShareDBSnapshot = (shareDBConnection, collectionName) => (id) =>
  new Promise((resolve, reject) => {
    // See https://github.com/share/sharedb/blob/master/examples/counter-json1/server.js
    const shareDBDoc = shareDBConnection.get(collectionName, id);
    shareDBDoc.fetch((error) => {
      if (error) {
        return reject(error);
      }
      if (shareDBDoc.type === null) {
        // Not found.
        return resolve(null);
      }
      const { version, data, type } = shareDBDoc;
      const snapshot = { v: version, data, type };
      resolve(snapshot);
    });
  });
