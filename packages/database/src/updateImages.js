import jsonDiff from 'json0-ot-diff';
import diffMatchPatch from 'diff-match-patch';
import { THUMBNAIL_IMAGES } from './collectionName';
import { fetchShareDBDoc } from './fetchShareDBDoc';

export const updateImages = connection => options => {
  const { id, images } = options;
  const doc = connection.get(THUMBNAIL_IMAGES, id);
  const data = images.thumbnail;
  doc.fetch(error => {
    if (!doc.type) {
      doc.create(data);
    } else {
      doc.submitOp(jsonDiff(doc.data, data, diffMatchPatch));
    }
  });
};
