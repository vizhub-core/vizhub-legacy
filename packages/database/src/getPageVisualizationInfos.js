import {
  VisualizationInfo,
  VISUALIZATION_TYPE,
  VIZ_INFO_SORT_OPTIONS,
  VIZ_INFO_DEFAULT_SORT_OPTION,
} from 'vizhub-entities';
import { DOCUMENT_INFO } from './collectionName';
import { fetchShareDBQuery } from './fetchShareDBQuery';

const defaultSort = VIZ_INFO_DEFAULT_SORT_OPTION.id;
const isAllowed = (sort) =>
  !!VIZ_INFO_SORT_OPTIONS.find(({ id }) => id === sort);

// The number of vizzes shown in a page of content.
// Infinite scroll pagination fetches the next page.
const pageSize = 2;

export const getPageVisualizationInfos = (connection) => async ({
  query,
  offset,
  sort,
  includePrivate,
  extraQueryParams = {},
}) => {
  const sortId = isAllowed(sort) ? sort : defaultSort;

  const sortField = VIZ_INFO_SORT_OPTIONS.find(({ id }) => id === sortId)
    .vizInfoProperty;

  const mongoQuery = {
    documentType: VISUALIZATION_TYPE,
    $limit: pageSize,
    $skip: offset * pageSize,
    $sort: { [sortField]: -1 },
    ...extraQueryParams,
  };

  if (!includePrivate) {
    mongoQuery.privacy = { $ne: 'private' };
  }

  if (query) {
    mongoQuery['$text'] = { $search: query };
  }

  const results = await fetchShareDBQuery(
    DOCUMENT_INFO,
    mongoQuery,
    connection
  );

  // Uncomment to introduce delay for manual testing.
  //const foo = await new Promise(resolve => {setTimeout(() => resolve(), 3000);});
  return results.map((shareDBDoc) => new VisualizationInfo(shareDBDoc.data));
};
