import { USER, THUMBNAIL_IMAGES, PREVIEW_IMAGES, DOCUMENT_CONTENT, DOCUMENT_INFO } from 'vizhub-database';

export const vizRead = (request, callback) => {
  // Unpack the ShareDB request object.
  const {
    agent: { isServer, userId },
    collection,
    vizInfo,
    snapshots
  } = request;

  console.log('isServer:');
  console.log(isServer);

  // Let the server do whatever it wants, because
  // all interactions there are mediated by interactors.
  if (isServer) {
    return callback();
  }

  //if (collection === DOCUMENT_CONTENT || collection === DOCUMENT_INFO){
  //  console.log('reading a viz');
  //  console.log(vizInfo);
  //  if (vizInfo.privacy === 'private') {
  //    return callback(new Error('Private viz.'));
  //  }
  //}

  return callback('This error does not appear');
  //return callback();

};
