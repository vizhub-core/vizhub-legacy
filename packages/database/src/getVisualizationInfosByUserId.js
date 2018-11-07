import { i18n } from 'datavis-tech-i18n';
import { VisualizationInfo, VISUALIZATION_TYPE } from 'datavis-tech-entities';
import { DOCUMENT_INFO } from './collectionName';
import { fetchShareDBQuery } from './fetchShareDBQuery';

export const getVisualizationInfosByUserId = connection => async (id) => {
  const mongoQuery = {
    owner: id,
    documentType: VISUALIZATION_TYPE
  };
  const results = await fetchShareDBQuery(DOCUMENT_INFO, mongoQuery, connection);
  return results
    .map(shareDBDoc => new VisualizationInfo(shareDBDoc.data))
    .reverse(); // Show most recent first
}
