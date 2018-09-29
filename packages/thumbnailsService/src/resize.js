import sharp from 'sharp';
import { computeImageDimensions } from './computeImageDimensions';

export const resize = options => {
  const {
    visualizationViewModel,
    screenshotBuffer,
    desiredDimensions
  } = options;

  const { width, height } = computeImageDimensions({
    actual: visualizationViewModel,
    desired: desiredDimensions
  });

  sharp(screenshotBuffer)
    .resize(width, height)
    .toBuffer();
};
