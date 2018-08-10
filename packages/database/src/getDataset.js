import { Dataset, DatasetInfo, DatasetContent, DATASET_TYPE } from 'datavis-tech-entities';
import { DOCUMENT_INFO, DOCUMENT_CONTENT } from './collectionName';
import { fetchShareDBDoc } from './fetchShareDBDoc';
import { fetchShareDBQuery } from './fetchShareDBQuery';

// TODO use user id not userName
export const getDataset = connection => async ({ userName, slug }) => {

  const mongoQuery = {
    documentType: DATASET_TYPE,
    slug
  };
  const results = await fetchShareDBQuery(DOCUMENT_INFO, mongoQuery, connection);
  const info = results[0];

  const content = await fetchShareDBDoc(DOCUMENT_CONTENT, info.id, connection);

  return {
    dataset: new Dataset({
      datasetInfo: new DatasetInfo(info.data),
      datasetContent: new DatasetContent(content.data)
    })
  };
};
