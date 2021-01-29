import {
  VisualizationInfo,
  VISUALIZATION_TYPE,
  VIZ_INFO_SORT_OPTIONS,
  VIZ_INFO_DEFAULT_SORT_OPTION,
} from 'vizhub-entities';
import { DOCUMENT_INFO } from './collectionName';
import { fetchShareDBQuery } from './fetchShareDBQuery';
import { pageSize } from './constants';

const defaultSort = VIZ_INFO_DEFAULT_SORT_OPTION.id;
const isAllowed = (sort) =>
  !!VIZ_INFO_SORT_OPTIONS.find(({ id }) => id === sort);

export const searchVisualizationInfos = (connection) => async ({
  query,
  offset,
  sort,
  owner,
  collaborators,
  inlcudePrivate,
  onlyPrivate,
  extraQueryParams = {},
}) => {
  const sortId = isAllowed(sort) ? sort : defaultSort;

  const sortField = VIZ_INFO_SORT_OPTIONS.find(({ id }) => id === sortId)
    .vizInfoProperty;

  const mongoQuery = {
    documentType: VISUALIZATION_TYPE,
    $limit: pageSize,
    $skip: offset * pageSize,
    $sort: { lastUpdatedTimestamp: -1 },
    privacy: { $ne: 'private' },
    owner,
    $sort: { [sortField]: -1 },
    ...extraQueryParams,
  };

  if (inlcudePrivate) {
    delete mongoQuery['privacy'];
  }

  if (onlyPrivate) {
    mongoQuery['privacy'] = 'private';
  }

  if (query) {
    mongoQuery['$text'] = { $search: query };
  }

  if (collaborators && collaborators.length > 0) {
    mongoQuery['collaborators.userId'] = {
      $in: collaborators,
    };
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
