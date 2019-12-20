import {
  DOCUMENT_CONTENT,
  DOCUMENT_INFO,
  fetchShareDBDoc
} from 'vizhub-database';
import { VisualizationInfo } from 'vizhub-entities';

// Populates request.vizInfo.
export const getVizInfo = connection => (request, done) => {
  const { collection, snapshot, op, id } = request;

  // Do nothing in the case of create and delete ops.
  if (op.create || op.del) {
    return done();
  }

  // Query for viz info in case of op agains a viz content document.
  if (collection === DOCUMENT_CONTENT) {
    // Query for corresponding info document
    fetchShareDBDoc(DOCUMENT_INFO, id, connection).then(infoDoc => {
      request.vizInfo = new VisualizationInfo(infoDoc.data);
      done();
    });
  } else {
    // No need to query in case of op against a viz info document.
    request.vizInfo = new VisualizationInfo(snapshot.data);
  }
};
