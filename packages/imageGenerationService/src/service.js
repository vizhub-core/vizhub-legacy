import { serverGateways } from 'vizhub-server-gateways';
import { UpdateImages } from 'datavis-tech-use-cases';
import { generateImages, defaultWaitTime } from './generateImages';

const noop = () => {};

export const startService = ({ waitTime = defaultWaitTime }) => {

  const gateways = Object.assign({}, serverGateways(), {
    imageGeneratorGateway: {
      generateImages
    }
  });

  const updateImages = new UpdateImages(gateways, waitTime);

  //console.log('Image generation service starting...');

  let loop = () => {
    //console.log('Checking for visualizations in need of images..');
    Promise.all([
      updateImages.execute(),
      new Promise(resolve => setTimeout(resolve, waitTime))
    ]).then(loop);
  }
  loop();

  return {
    stopService: () => {
      loop = noop;
    }
  };
};
