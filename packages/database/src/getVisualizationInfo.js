import { VisualizationInfo } from 'vizhub-entities';
import { DOCUMENT_INFO } from './collectionName';
import { fetchShareDBDoc } from './fetchShareDBDoc';

export const getVisualizationInfo = (connection) => ({ id }) =>
  fetchShareDBDoc(DOCUMENT_INFO, id, connection).then(
    (info) => new VisualizationInfo(info.data)
  );
