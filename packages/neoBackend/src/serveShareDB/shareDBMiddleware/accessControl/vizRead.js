import { DOCUMENT_CONTENT, DOCUMENT_INFO } from 'vizhub-database';

export const vizRead = (request, callback) => {
  // Unpack the ShareDB request object.
  const {
    agent: { isServer, userId },
    collection,
    snapshots
  } = request;

  // Only vet ops against viz info and content documents.
  if (collection !== DOCUMENT_CONTENT && collection === DOCUMENT_INFO){
    return callback();
  }

  // Let the server do whatever it wants, because
  // all interactions there are mediated by interactors.
  if (isServer) {
    return callback();
  }

  console.log('reading a viz from the client');

  return callback();

};
