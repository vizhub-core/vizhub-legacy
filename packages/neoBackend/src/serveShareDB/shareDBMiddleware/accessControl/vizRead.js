import { USER, THUMBNAIL_IMAGES, PREVIEW_IMAGES, DOCUMENT_CONTENT, DOCUMENT_INFO } from 'vizhub-database';

export const vizRead = (request, callback) => {
  // Unpack the ShareDB request object.
  const {
    agent: { isServer, userId },
    collection,
    vizInfo,
    snapshots
  } = request;

  // Let the server do whatever it wants, because
  // all interactions there are mediated by interactors.
  if (isServer) {
    return callback();
  }

  if (collection === DOCUMENT_CONTENT || collection === DOCUMENT_INFO){
    console.log('reading a viz');
    return callback();
    //console.log(vizInfo);
    //if (vizInfo.privacy === 'private') {
    //  return callback(new Error('Private viz.'));
    //}
  }

  return callback();

};
