import { serverGateways } from 'vizhub-server-gateways';
import { UpdateImages } from 'vizhub-use-cases';
import { generateImages, defaultWaitTime } from './generateImages';

const noop = () => {};

// Give some time after image generation for the images to be stored.
// Otherwise we'd generate the same image twice in a row.
const downTime = 5000;

export const startService = ({ waitTime = defaultWaitTime }) => {

  const gateways = Object.assign({}, serverGateways(), {
    imageGeneratorGateway: {
      generateImages
    }
  });

  const updateImages = new UpdateImages(gateways, waitTime);

  console.log('Image generation service starting...');

  let loop = () => {
    console.log('Checking for visualizations in need of images..');
    Promise.all([
      updateImages.execute(),
      new Promise(resolve => setTimeout(resolve, waitTime + downTime))
    ]).then(loop);
  }
  loop();

  return {
    stopService: () => {
      loop = noop;
    }
  };
};
