import assert from 'assert';
import { testData } from 'datavis-tech-entities';
import { generateImages } from '../src/generateImages';
import { computeImageDimensions } from '../src/computeImageDimensions';

const { visualization } = testData;

const expectedThumbnail = 'fdsa';
const expectedPreview = 'fdsa';

describe('Thumbnails Service', () => {
  it('should compute correct thumbnail dimensions for same aspect ratio', async () => {
    const { width, height } = computeImageDimensions({
      actual: { width: 960, height : 500 },
      desired: { width: 230, height: 120 }
    });
    assert.equal(width, 230);
    assert.equal(height, 120);
  });

  it('should compute correct thumbnail dimensions for taller visualization', async () => {
    const { width, height } = computeImageDimensions({
      actual: { width: 960, height : 800 },
      desired: { width: 230, height: 120 }
    });
    assert.equal(width, 230);
    assert.equal(height, 276);
  });

  it('should compute correct thumbnail dimensions for shorter visualization', async () => {
    const { width, height } = computeImageDimensions({
      actual: { width: 960, height : 200 },
      desired: { width: 230, height: 120 }
    });
    assert.equal(width, 576);
    assert.equal(height, 120);
  });

  it('should make a thumbnail for a visualization', async () => {
    const images = await generateImages(visualization);
    console.log(images.thumbnail);
    //assert.equal(images.thumbnail, expectedThumbnail);
    //assert.equal(images.preview, expectedPreview);
  });
});
