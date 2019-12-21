import {
  DOCUMENT_CONTENT,
  DOCUMENT_INFO,
  fetchShareDBDoc
} from 'vizhub-database';
import { VisualizationInfo } from 'vizhub-entities';
import { getSnapshot } from './getSnapshot';

// Populates request.vizInfo with the VisualitionInfo document
// corresponding to the document to which the op is being applied.
export const getVizInfo = connection => (request, callback) => {
  const { collection, op } = request;

  // Do nothing in the case of create and delete ops.
  if (op && (op.create || op.del)) {
    return callback();
  }

  getSnapshot(request, (error, snapshot) => {
    if(error) {
      return callback(error);
    }
    const { id } = snapshot;

    // Query for viz info in case of op agains a viz content document.
    if (collection === DOCUMENT_CONTENT) {

      // Query for corresponding info document
      fetchShareDBDoc(DOCUMENT_INFO, id, connection).then(infoDoc => {
        request.vizInfo = new VisualizationInfo(infoDoc.data);
        callback();
      });
    } else if (collection === DOCUMENT_INFO){
      // No need to query in case of op against a viz info document.
      request.vizInfo = new VisualizationInfo(snapshot.data);
      return callback();
    }
  });

};
