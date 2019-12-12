import { i18n } from 'vizhub-i18n';
import { VisualizationInfo, VISUALIZATION_TYPE } from 'vizhub-entities';
import { DOCUMENT_INFO } from './collectionName';
import { fetchShareDBQuery } from './fetchShareDBQuery';

// The number of vizzes shown in a page of content.
// Infinite scroll pagination fetches the next page.
const pageSize = 200;

export const getHomePageVisualizationInfos = connection => async () => {
  const mongoQuery = {
    documentType: VISUALIZATION_TYPE,
    $limit: pageSize,
    $sort: {lastUpdatedTimestamp: -1}
  };
  const results = await fetchShareDBQuery(
    DOCUMENT_INFO,
    mongoQuery,
    connection
  );
  return results.map(shareDBDoc => new VisualizationInfo(shareDBDoc.data));
};
