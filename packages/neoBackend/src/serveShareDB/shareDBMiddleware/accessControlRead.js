//const get = require('lodash/get')
//const { isIncrementViewCount } = require('../db/accessors')
import { USER, THUMBNAIL_IMAGES, PREVIEW_IMAGES, DOCUMENT_CONTENT, DOCUMENT_INFO } from 'vizhub-database';

export const accessControlRead = (request, done) => {
  // Unpack the ShareDB request object.
  const {
    agent: { isServer, userId },
    owner,
    vizInfo,
    op,
    collection
  } = request;

  // Allow reads on all users.
  if (collection === USER) {
    return done();
  }

  // Allow reads on all thumbnail images.
  // TODO restrict access to thumbnails of private vizzes
  if (collection === THUMBNAIL_IMAGES) {
    return done();
  }

  // Allow reads on all preview images.
  // TODO restrict access to previews of private vizzes
  if (collection === PREVIEW_IMAGES) {
    return done();
  }

  if (collection === DOCUMENT_CONTENT || collection === DOCUMENT_INFO){
    if (vizInfo.privacy === 'private') {
      return done('Private viz.');
    }
  }

  //done('Case not handled');
  done();

  // TODO this might be useful when we add collaborators in future.
  //// Check that the user is either the owner or a collaborator.
  //if (owner !== userId) {
  //  const ids = (collaborators || []).map(({id}) => id)
  //  const isCollaborator = ids.filter(id => id === userId).length
  //  if (!isCollaborator) {
  //    return done('You must be the owner of this document or a collaborator in order to edit it.')
  //  }
  //}
};
