import { VisualizationInfo } from 'vizhub-entities';
import { getConnection } from 'vizhub-server-gateways';
import {
  DOCUMENT_CONTENT,
  DOCUMENT_INFO,
  fetchShareDBDoc
} from 'vizhub-database';

// Gets the VisualitionInfo document
// corresponding to the document to which the op is being applied.
export const getVizInfo = async (collection, snapshot) => {
  // Query for viz info in case of op agains a viz content document.
  if (collection === DOCUMENT_CONTENT) {
    // Query for corresponding info document
    return fetchShareDBDoc(DOCUMENT_INFO, snapshot.id, getConnection()).then(
      infoDoc => new VisualizationInfo(infoDoc.data)
    );
  }

  if (collection === DOCUMENT_INFO) {
    // No need to query in case of op against a viz info document.
    return new VisualizationInfo(snapshot.data);
  }

  throw new Error(
    'getVizInfo only makes sense for DOCUMENT_CONTENT or DOCUMENT_INFO collections'
  );
};
