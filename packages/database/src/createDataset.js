import { DOCUMENT_INFO, DOCUMENT_CONTENT } from './collectionName';

export const createDataset = connection => dataset => {
  const id = dataset.id;
  const slug = dataset.info.slug;

  return new Promise(resolve => {
    // TODO handle errors here.
    connection.get(DOCUMENT_INFO, id).create(dataset.info);
    connection.get(DOCUMENT_CONTENT, id).create(dataset.content);

    // TODO only resolve after document created,
    // to avoid race conditions.
    resolve({ slug });
  });
};
