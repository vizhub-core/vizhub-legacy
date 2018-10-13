import { serverGateways } from 'vizhub-server-gateways';
import { UpdateImages } from 'datavis-tech-use-cases';

const updateImages = new updateImages(serverGateways);

const updateImagesInterval = 12 * 1000;

console.log('Thumbnail service starting...');

setInterval(() => {
  updateImages.execute();
}, updateImagesInterval);
