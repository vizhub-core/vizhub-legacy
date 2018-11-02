import assert from 'assert';
import { serverGateways } from 'vizhub-server-gateways';
import { testData } from 'datavis-tech-entities';
import { generateImages } from '../src/generateImages';
import { computeImageDimensions } from '../src/computeImageDimensions';
import { thumbnailDimensions, previewDimensions } from '../src/dimensions';
import { expectedThumbnail, expectedPreview } from './expectedImages';
import { startService } from '../src/service';

const { visualization } = testData;

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
      const actual = { width: 960, height: 600 };
      const desired = { width: 230, height: 120 };
      const { width, height } = computeImageDimensions({ actual, desired });
      assert((actual.width / actual.height - width / height) < 0.01);
      assert((width / height - actual.width / actual.height) < 0.01);
    });

    it('should compute correct thumbnail dimensions for shorter visualization', () => {
      const actual = { width: 960, height: 200 };
      const desired = { width: 230, height: 120 };
      const { width, height } = computeImageDimensions({ actual, desired });
      assert.equal(height, desired.height);
      assert((actual.width / actual.height - width / height) < 0.01);
      assert((width / height - actual.width / actual.height) < 0.01);
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

  describe('image generation', () => {
    it('should make a thumbnail for a visualization', async () => {
      const { thumbnail, preview } = await generateImages(visualization, 500);
      assert.equal(preview, expectedPreview);
      assert.equal(thumbnail, expectedThumbnail);
    });
  });

  describe('service integration', () => {
    it('should generate images as a service', async () => {
      const gateways = serverGateways();
      const options = Object.assign({}, visualization.info, visualization.content);
      await gateways.visualizationGateway.createVisualization(options);

      const { stopService } = startService({
        waitTime: 1000,
      });

      // TODO verify the images landed in the DB
      // TODO stop service
    });
  });
});
