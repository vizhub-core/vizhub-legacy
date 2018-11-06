import jsonDiff from 'json0-ot-diff';
import diffMatchPatch from 'diff-match-patch';
import { PREVIEW_IMAGES } from './collectionName';
import { fetchShareDBDoc } from './fetchShareDBDoc';

export const getPreview = connection => options => {
  const { id } = options;
  const doc = connection.get(PREVIEW_IMAGES, id);
  return new Promise((resolve, reject) => {
    doc.fetch(error => {
      if (!doc.type) {
        reject(new Error('Preview does not exist for document ' + id));
      } else {
        resolve(doc.data);
      }
    });
  });
};
