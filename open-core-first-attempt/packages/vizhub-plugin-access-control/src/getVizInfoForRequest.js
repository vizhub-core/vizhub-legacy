import { VizInfo } from 'vizhub-core';
import { getShareDBSnapshot } from 'vizhub-core/server';

// TODO refactor to centralize location of this constant
// and use it elsewhere in the codebase.
const DOCUMENT_INFO = 'documentInfo';
const DOCUMENT_CONTENT = 'documentContent';

// Derives the VizInfo entity corresponding to the request.
export const getVizInfoForRequest = async (collection, snapshots) => {
  // Sanity check.
  if (snapshots.length !== 1) {
    // Not sure when it would ever not be 1.
    throw new Error('Expected snapshots.length to equal 1.');
  }

  const { data } = snapshots[0];

  // If we're reading an info doc, return it.
  if (collection === DOCUMENT_INFO) {
    return VizInfo(data);
  } else if (collection === DOCUMENT_CONTENT) {
    console.log('reading content doc');
    // If we're reading a content doc,
    // we need to look up the corresponding info doc,
    // which has the data required for access control.
    //return VizInfo(await getShareDBSnapshot());
    return null;
  }
};
