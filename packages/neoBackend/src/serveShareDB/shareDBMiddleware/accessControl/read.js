//const get = require('lodash/get')
//const { isIncrementViewCount } = require('../db/accessors')
import {
  USER,
  THUMBNAIL_IMAGES,
  PREVIEW_IMAGES,
  DOCUMENT_CONTENT,
  DOCUMENT_INFO,
} from 'vizhub-database';

export const accessControlRead = (request, done) => {
  // Unpack the ShareDB request object.
  const {
    agent: { isServer, userId },
    owner,
    vizInfo,
    op,
    collection,
  } = request;

  if (collection === DOCUMENT_CONTENT || collection === DOCUMENT_INFO) {
    if (vizInfo.privacy === 'private') {
      return done('Private viz.');
    }
  }
};
