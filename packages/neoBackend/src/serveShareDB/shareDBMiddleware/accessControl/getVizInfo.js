import { VisualizationInfo } from 'vizhub-entities';
import { getConnection } from 'vizhub-server-gateways';
import {
  DOCUMENT_CONTENT,
  DOCUMENT_INFO,
  fetchShareDBDoc
} from 'vizhub-database';

// Populates request.vizInfo with the VisualitionInfo document
// corresponding to the document to which the op is being applied.
export const getVizInfo = (request, callback) => {
  const { collection, op, snapshot } = request;
  const { id } = snapshot;

  // Do nothing in the case of create and delete ops.
  if (op && (op.create || op.del)) {
    return callback();
  }

  // Query for viz info in case of op agains a viz content document.
  if (collection === DOCUMENT_CONTENT) {

    // Query for corresponding info document
    return fetchShareDBDoc(DOCUMENT_INFO, id, getConnection()).then(infoDoc => {
      callback(null, new VisualizationInfo(infoDoc.data));
    });
  }
  
  if (collection === DOCUMENT_INFO){
    // No need to query in case of op against a viz info document.
    request.vizInfo = new VisualizationInfo(snapshot.data);
    return callback();
  }

  return callback();

};
