import { VisualizationInfo, VISUALIZATION_TYPE } from 'vizhub-entities';
import { DOCUMENT_INFO } from './collectionName';
import { fetchShareDBQuery } from './fetchShareDBQuery';
import { pageSize } from './constants';

export const searchVisualizationInfos = (connection) => async ({
  query,
  collaborators,
  offset,
  inlcudePrivate,
  onlyPrivate,
  owner,
}) => {
  const mongoQuery = {
    documentType: VISUALIZATION_TYPE,
    $limit: pageSize,
    $skip: offset * pageSize,
    $sort: { lastUpdatedTimestamp: -1 },
    privacy: { $ne: 'private' },
    owner,
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
