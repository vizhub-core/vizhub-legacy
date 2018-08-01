import { Dataset, DatasetInfo, DatasetContent } from 'datavis-tech-entities';
import { DOCUMENT_INFO, DOCUMENT_CONTENT } from './collectionName';
import { fetchShareDBDoc } from './fetchShareDBDoc';
import { fetchShareDBDocBySlug } from './fetchShareDBDocBySlug';

export const getDataset = connection => async ({ slug }) => {
  const info = await fetchShareDBDocBySlug(DOCUMENT_INFO, slug, connection);
  const content = await fetchShareDBDoc(DOCUMENT_CONTENT, info.id, connection);
  return {
    dataset: new Dataset({
      datasetInfo: new DatasetInfo(info.data),
      datasetContent: new DatasetContent(content.data)
    })
  };
};
