import { serverGateways } from 'vizhub-server-gateways';
import { UpdateImages } from 'datavis-tech-use-cases';
import { generateImages } from './generateImages';

export const startService = ({ updateInterval }) => {

  const gateways = Object.assign({}, serverGateways(), {
    imageGeneratorGateway: {
      generateImages
    }
  });

  const updateImages = new UpdateImages(gateways);

  console.log('Image generation service starting...');

  const interval = setInterval(() => {
    console.log('Checking for visualizations in need of images..');
    updateImages.execute();
  }, updateInterval);

  console.log(interval);

  return {
    stopService: () => {
      clearInterval(interval);
    }
  };
};
