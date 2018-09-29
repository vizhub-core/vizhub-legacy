import * as assert from 'assert';
import { testData } from 'datavis-tech-entities';

const { visualization } = testData;

const expectedThumbnail = 'dsafds';
const expectedPreview = 'dsafds';

describe('Thumbnails Service', () => {
  it('should make a thumbnail for a visualization', () => {
    const images = generateImages(visualization);
    console.log(images.thumbnail);
    console.log(images.preview);
    //assert.equal(images.thumbnail, expectedThumbnail);
    //assert.equal(images.preview, expectedPreview);
  });
});
