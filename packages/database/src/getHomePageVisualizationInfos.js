import {
  VisualizationInfo,
  VISUALIZATION_TYPE,
  VIZ_INFO_SORT_OPTIONS,
  VIZ_INFO_DEFAULT_SORT_OPTION,
} from 'vizhub-entities';
import { DOCUMENT_INFO } from './collectionName';
import { fetchShareDBQuery } from './fetchShareDBQuery';

const defaultSort = VIZ_INFO_DEFAULT_SORT_OPTION.vizInfoProperty;
const isAllowed = (sort) =>
  !!VIZ_INFO_SORT_OPTIONS.find(
    ({ vizInfoProperty }) => vizInfoProperty === sort
  );

// The number of vizzes shown in a page of content.
// Infinite scroll pagination fetches the next page.
const pageSize = 100;

export const getHomePageVisualizationInfos = (connection) => async ({
  offset,
  sort, // corresponds to vizInfoProperty
}) => {
  const sortField = isAllowed(sort) ? sort : defaultSort;

  const mongoQuery = {
    documentType: VISUALIZATION_TYPE,
    $limit: pageSize,
    $skip: offset * pageSize,
    $sort: { [sortField]: -1 },
    privacy: { $ne: 'private' },
  };
  const results = await fetchShareDBQuery(
    DOCUMENT_INFO,
    mongoQuery,
    connection
  );

  // Uncomment to introduce delay for manual testing.
  //const foo = await new Promise(resolve => {setTimeout(() => resolve(), 3000);});
  return results.map((shareDBDoc) => new VisualizationInfo(shareDBDoc.data));
};
