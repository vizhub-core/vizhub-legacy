import { VizInfo } from 'vizhub-core';
import { getShareDBSnapshot } from 'vizhub-core/server';

// TODO refactor to centralize location of this constant
// and use it elsewhere in the codebase.
const DOCUMENT_INFO = 'documentInfo';
const DOCUMENT_CONTENT = 'documentContent';

// Derives the VizInfo entity corresponding to the request.
const getVizInfoForRequest = async (collection, snapshots) => {
  // Sanity check.
  if (snapshots.length !== 1) {
    // Not sure when it would ever not be 1.
    throw new Error('Expected snapshots.length to equal 1.');
  }

  // If we're reading an info doc, return it.
  if (collection === DOCUMENT_INFO) {
    console.log('reading info doc');
    return VizInfo(snapshots[0].data);
  } else if (collection === DOCUMENT_CONTENT) {
    console.log('reading content doc');
    // If we're reading a content doc,
    // we need to look up the corresponding info doc,
    // which has the data required for access control.
    return VizInfo(await getShareDBSnapshot());
  }
};

const vizRead = (context, next) => {
  const { collection, snapshots, snapshotType } = context;
  try {
    const vizInfo = getVizInfoForRequest(collection, snapshots);

    next();
  } catch (error) {
    next(error);
  }
  next();
};

// Disallow all writes for now.
const vizWrite = (context, next) => {
  next(new Error('Unauthorized'));
};

// See https://share.github.io/sharedb/middleware/
export const accessControl = (shareDB) => {
  shareDB.use('readSnapshots', vizRead);

  // Note: The snapshot has not yet been fetched.
  //If you want to make any changes or assertions involving the snapshot,
  //that should be done in the apply or commit hooks.
  // TODO We might want to use('apply', vizWrite), so that we can
  // access the snapshot which contains ownership and collaborator permissions.
  shareDB.use('submit', vizWrite);
};
