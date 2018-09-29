import sharp from 'sharp';
import { computeImageDimensions } from './computeImageDimensions';

export const resize = async options => {
  const {
    visualizationViewModel,
    screenshotBuffer,
    desiredDimensions
  } = options;

  const { width, height } = computeImageDimensions({
    actual: visualizationViewModel,
    desired: desiredDimensions
  });

  return await sharp(screenshotBuffer)
    .resize(width, height)
    .toBuffer();
};
