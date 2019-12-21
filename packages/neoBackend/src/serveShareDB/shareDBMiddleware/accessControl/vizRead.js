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
  if (collection !== DOCUMENT_CONTENT && collection === DOCUMENT_INFO){
    return;
  }

  // Let the server do whatever it wants, because
  // all interactions there are mediated by interactors.
  if (isServer) {
    return;
  }

  return getVizInfo(collection, snapshots[0]).then(vizInfo => {
    console.log('reading a viz from the client');
    console.log(vizInfo);
    return;
  });

};

export const vizRead = (request, callback) => {
  vizReadAsync(request)
    .then(() => callback())
    .catch(error => callback(error.message));
};
