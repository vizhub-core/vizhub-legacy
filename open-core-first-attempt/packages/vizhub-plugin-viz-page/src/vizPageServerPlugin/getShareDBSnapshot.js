// Gets a current snapshot of a ShareDB document.
// See https://share.github.io/sharedb/api/connection#fetchsnapshot
export const getShareDBSnapshot = (shareDBConnection, collectionName) => (id) =>
  new Promise((resolve, reject) => {
    const shareDBDoc = shareDBConnection.fetchSnapshot(
      collectionName,
      id,
      (error, shareDBSnapshot) => {
        if (error) return reject(error);
        const notFound = shareDBSnapshot.type === null;
        resolve(notFound ? null : shareDBSnapshot);
      }
    );
  });
