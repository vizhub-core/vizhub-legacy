import sharp from 'sharp';
import { computeImageDimensions } from './computeImageDimensions';

export const resize = async options => {
  const {
    actualDimensions: actual,
    desiredDimensions: desired,
    screenshotBuffer
  } = options;

  const { width, height } = computeImageDimensions({ actual, desired });

  console.log(width / height);
  console.log(actual.width / actual.height);
  console.log({width, height});

  return await sharp(screenshotBuffer)
    .resize(width, height)
    .toBuffer();
};
