import jsonDiff from 'json0-ot-diff';
import diffMatchPatch from 'diff-match-patch';
import { DOCUMENT_INFO } from './collectionName';
import { fetchShareDBDoc } from './fetchShareDBDoc';
import { save } from './save';

export const setImagesUpdatedTimestamp = connection => options => {
  const { id, imagesUpdatedTimestamp } = options;

  return fetchShareDBDoc(DOCUMENT_INFO, id, connection).then(doc => {
    const newData = Object.assign({}, doc.data, { imagesUpdatedTimestamp });
    return save(doc, newData);
  });
};
