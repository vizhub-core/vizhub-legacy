import jsonDiff from 'json0-ot-diff';
import diffMatchPatch from 'diff-match-patch';
import { THUMBNAIL_IMAGES, PREVIEW_IMAGES } from './collectionName';
import { fetchShareDBDoc } from './fetchShareDBDoc';
import { save } from './save';

export const updateImages = connection => options => {
  const { id, images } = options;
  Promise.all([
    fetchShareDBDoc(THUMBNAIL_IMAGES, id, connection),
    fetchShareDBDoc(PREVIEW_IMAGES, id, connection)
  ])
  .then(([thumbnailDoc, previewDoc]) => Promise.all([
    save(thumbnailDoc, images.thumbnail),
    save(previewDoc, images.preview)
  ]))
};
