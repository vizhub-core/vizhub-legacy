import assert from 'assert';
import { testData } from 'datavis-tech-entities';
import { generateImages } from '../src/generateImages';
import { computeImageDimensions } from '../src/computeImageDimensions';
import { thumbnailDimensions, previewDimensions } from '../src/dimensions';

const { visualization } = testData;

const expectedThumbnail = 'fdsa';
const expectedPreview = 'fdsa';

describe('Thumbnails Service', () => {
  describe('computeImageDimensions', () => {
    it('should compute correct thumbnail dimensions for same aspect ratio', () => {
      const { width, height } = computeImageDimensions({
        actual: { width: 960, height : 500 },
        desired: { width: 230, height: 120 }
      });
      assert.equal(width, 230);
      assert.equal(height, 120);
    });

    it('should compute correct thumbnail dimensions for taller visualization', () => {
      const { width, height } = computeImageDimensions({
        actual: { width: 960, height : 800 },
        desired: { width: 230, height: 120 }
      });
      assert.equal(width, 230);
      assert.equal(height, 276);
    });

    it('should compute correct thumbnail dimensions for shorter visualization', () => {
      const { width, height } = computeImageDimensions({
        actual: { width: 960, height : 200 },
        desired: { width: 230, height: 120 }
      });
      assert.equal(width, 576);
      assert.equal(height, 120);
    });
  });

  describe('dimensions', () => {
    it('thumbnailDimensions', () => {
      assert.equal(thumbnailDimensions.width, 230);
      assert.equal(thumbnailDimensions.height, 120);
    });

    it('previewDimensions', () => {
      assert.equal(previewDimensions.width, 960);
      assert.equal(previewDimensions.height, 500);
    });
  });

  it('should make a thumbnail for a visualization', async () => {
    const images = await generateImages(visualization);
    //console.log(images.thumbnail);
    //assert.equal(images.thumbnail, expectedThumbnail);
    //assert.equal(images.preview, expectedPreview);
  });
});
