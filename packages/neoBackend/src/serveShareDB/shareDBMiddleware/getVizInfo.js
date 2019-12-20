import {
  DOCUMENT_CONTENT,
  DOCUMENT_INFO,
  fetchShareDBDoc
} from 'vizhub-database';
import { VisualizationInfo } from 'vizhub-entities';

// Populates request.vizInfo.
export const getVizInfo = connection => (request, done) => {
  const { collection, snapshot, snapshots, op, id } = request;

  // Do nothing in the case of create and delete ops.
  if (op && (op.create || op.del)) {
    return done();
  }

  // Query for viz info in case of op agains a viz content document.
  if (collection === DOCUMENT_CONTENT) {
    // Query for corresponding info document
    // TODO work on the case of fetching multiple documents.
    const primaryId = id || snapshots[0].id;
    fetchShareDBDoc(DOCUMENT_INFO, primaryId, connection).then(infoDoc => {
      request.vizInfo = new VisualizationInfo(infoDoc.data);
      done();
    });
  } else if (collection === DOCUMENT_INFO){
    // No need to query in case of op against a viz info document.
    if (snapshot) {
      request.vizInfo = new VisualizationInfo(snapshot.data);
    } else if (snapshots) {
      if(snapshots.length === 1){
        request.vizInfo = new VisualizationInfo(snapshots[0].data);
      } else {
        return done('Case of multiple info documents not handled')
      }
    }
    return done();
  }
};
