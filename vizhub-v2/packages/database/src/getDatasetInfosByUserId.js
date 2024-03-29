import { DatasetInfo, DATASET_TYPE } from 'vizhub-entities';
import { DOCUMENT_INFO } from './collectionName';
import { fetchShareDBQuery } from './fetchShareDBQuery';

/**
 * @deprecated
 */
export const getDatasetInfosByUserId = (connection) => async (id) => {
  const mongoQuery = {
    owner: id,
    documentType: DATASET_TYPE,
  };
  const results = await fetchShareDBQuery(
    DOCUMENT_INFO,
    mongoQuery,
    connection
  );
  return results.map((shareDBDoc) => new DatasetInfo(shareDBDoc.data));
};
