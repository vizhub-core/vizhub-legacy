import {
  VisualizationInfo,
  VISUALIZATION_TYPE,
  VIZ_INFO_SORT_OPTIONS,
  VIZ_INFO_DEFAULT_SORT_OPTION,
} from 'vizhub-entities';
import { DOCUMENT_INFO } from './collectionName';
import { fetchShareDBQuery } from './fetchShareDBQuery';
import { pageSize } from './constants';

const defaultSort = VIZ_INFO_SORT_OPTIONS.find(
  ({ id }) => id === VIZ_INFO_DEFAULT_SORT_OPTION.id
);

export const searchVisualizationInfos = (connection) => async ({
  query,
  offset,
  sort,
  owner,
  collaborators,
  privacy,
  extraQueryParams = {},
}) => {
  const requestedSort = VIZ_INFO_SORT_OPTIONS.find(({ id }) => id === sort);
  const sortToApply = requestedSort ? requestedSort : defaultSort;
  const sortField = sortToApply.vizInfoProperty;

  const mongoQuery = {
    documentType: VISUALIZATION_TYPE,
    $limit: pageSize,
    $skip: offset * pageSize,
    privacy: { $ne: 'private' },
    owner,
    $sort: { [sortField]: -1 },
    ...extraQueryParams,
  };

  if (privacy === 'private') {
    mongoQuery['privacy'] = 'private';
  }

  if (privacy === 'any') {
    delete mongoQuery['privacy'];
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
