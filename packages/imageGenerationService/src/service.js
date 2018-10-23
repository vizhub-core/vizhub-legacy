import { serverGateways } from 'vizhub-server-gateways';
import { UpdateImages } from 'datavis-tech-use-cases';
import { generateImages } from './generateImages';

export const startService = () => {

  const gateways = Object.assign({}, serverGateways(), {
    imageGeneratorGateway: {
      generateImages
    }
  });

  const updateImages = new UpdateImages(gateways);

  const updateImagesInterval = 12 * 1000;

  console.log('Image generation service starting...');

  setInterval(() => {
    console.log('Checking for visualizations in need of images..');
    updateImages.execute();
  }, updateImagesInterval);
};
