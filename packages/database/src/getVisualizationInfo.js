import { VisualizationInfo } from 'vizhub-entities';
import { DOCUMENT_INFO } from './collectionName';
import { fetchShareDBDoc } from './fetchShareDBDoc';

export const getVisualizationInfo = (connection) => ({ id }) =>
  fetchShareDBDoc(DOCUMENT_INFO, id, connection).then((visualization) => {
    if (visualization.data) {
      return new VisualizationInfo(visualization.data)
    } else {
      return { "error": `No data for ${id}` };
    }
  })
