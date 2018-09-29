import assert from 'assert';
import { testData } from 'datavis-tech-entities';
import { generateImages } from '../src/generateImages';

const { visualization } = testData;

const expectedThumbnail = 'fdsa';
const expectedPreview = 'fdsa';

describe('Thumbnails Service', () => {
  it('should make a thumbnail for a visualization', async () => {
    const images = await generateImages(visualization);
    console.log(images.thumbnail);
    console.log(images.preview);
    //assert.equal(images.thumbnail, expectedThumbnail);
    //assert.equal(images.preview, expectedPreview);
  });
});
