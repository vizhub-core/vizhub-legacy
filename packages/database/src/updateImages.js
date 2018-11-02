import jsonDiff from 'json0-ot-diff';
import diffMatchPatch from 'diff-match-patch';
import { THUMBNAIL_IMAGES } from './collectionName';
import { fetchShareDBDoc } from './fetchShareDBDoc';

export const updateImages = connection => ({ id: DocumentId, images: Images }) => {
  const shareDBDoc = connection.get(THUMBNAIL_IMAGES, id);
  const data = images.thumbnail;
  shareDBDoc.fetch(error => {
    if (!shareDBDoc.type) {
      doc.create(data);
    } else {
      doc.submitOp(jsonDiff(doc.data, data, diffMatchPatch));
    }
  });
};
