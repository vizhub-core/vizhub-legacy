import { VizHubError } from '../../VizHubError';

const toSnapshot = ({ version, data, type }) => ({
  v: version,
  data: data,
  type: type.uri,
});

// Gets a current snapshot of a ShareDB document.
// See https://share.github.io/sharedb/api/connection#fetchsnapshot
export const getShareDBSnapshot = (shareDBConnection, collectionName) => (id) =>
  new Promise((resolve, reject) => {
    const shareDBDoc = shareDBConnection.get(collectionName, id);
    shareDBDoc.fetch((error) => {
      if (error) {
        return reject(error);
      }
      if (shareDBDoc.type === null) {
        return reject(new VizHubError(ERR_NOT_FOUND));
      }
      resolve(toSnapshot(shareDBDoc));
    });
  });
