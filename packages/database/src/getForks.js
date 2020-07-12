import { VisualizationInfo, VISUALIZATION_TYPE } from 'vizhub-entities';
import { DOCUMENT_INFO } from './collectionName';
import { fetchShareDBQuery } from './fetchShareDBQuery';

// The number of vizzes shown in a page of content.
// Infinite scroll pagination fetches the next page.
const pageSize = 100;

export const getForks = (connection) => async ({
  forkedFrom,
  includePrivate,
  offset,
}) => {
  const mongoQuery = {
    forkedFrom,
    documentType: VISUALIZATION_TYPE,
  };

  if (!includePrivate) {
    mongoQuery['privacy'] = { $ne: 'private' };
  }

  if (offset !== undefined) {
    Object.assign(mongoQuery, {
      $limit: pageSize,
      $skip: offset * pageSize,
    });
  }

  const results = await fetchShareDBQuery(
    DOCUMENT_INFO,
    mongoQuery,
    connection
  );

  if (results) {
    return results.map((shareDBDoc) => new VisualizationInfo(shareDBDoc.data));
  } else {
    return []
  }
};
