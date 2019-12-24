import { DOCUMENT_CONTENT, DOCUMENT_INFO } from 'vizhub-database';
import { getVizInfo } from './getVizInfo';

const vizReadAsync = async request => {
  // Unpack the ShareDB request object.
  const {
    agent: { isServer, userId },
    collection,
    snapshots
  } = request;

  // Only vet ops against viz info and content documents.
  if (collection !== DOCUMENT_CONTENT && collection === DOCUMENT_INFO) {
    return;
  }

  // Let the server do whatever it wants, because
  // all interactions there are mediated by interactors.
  if (isServer) {
    return;
  }

  return Promise.all(
    snapshots.map(async snapshot => {
      const vizInfo = await getVizInfo(collection, snapshot);
      if (vizInfo.privacy === 'private') {
        if (vizInfo.owner !== userId) {
          throw new Error('This visualization is private.');
        }
      }
    })
  );
};

export const vizRead = (request, callback) => {
  vizReadAsync(request)
    .then(() => callback())
    .catch(error => callback(error.message));
};
