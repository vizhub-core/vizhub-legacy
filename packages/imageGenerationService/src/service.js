import { serverGateways } from 'vizhub-server-gateways';
import { UpdateImages } from 'datavis-tech-use-cases';
import { generateImages, defaultWaitTime } from './generateImages';

export const startService = ({ waitTime = defaultWaitTime }) => {

  const gateways = Object.assign({}, serverGateways(), {
    imageGeneratorGateway: {
      generateImages
    }
  });

  const updateImages = new UpdateImages(gateways, waitTime);

  console.log('Image generation service starting...');

  const interval = setInterval(() => {
    console.log('Checking for visualizations in need of images..');
    updateImages.execute();
  }, waitTime);

  return {
    stopService: () => {
      clearInterval(interval);
    }
  };
};
