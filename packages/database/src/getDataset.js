import { Dataset, DatasetInfo, DatasetContent } from 'datavis-tech-entities';
import { DOCUMENT_INFO, DOCUMENT_CONTENT } from './collectionName';
import { fetchShareDBDocBySlug } from './fetchShareDBDocBySlug';

export const getDataset = connection => ({ slug }) => (
  Promise.all([
    fetchShareDBDocBySlug(DOCUMENT_INFO, slug, connection),
    fetchShareDBDocBySlug(DOCUMENT_CONTENT, slug, connection)
  ])
  .then(([info, content]) => ({
    dataset: new Dataset({
      datasetInfo: new DatasetInfo(info.data),
      datasetContent: new DatasetContent(content.data)
    })
  }))
);
