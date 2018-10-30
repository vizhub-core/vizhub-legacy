import { VisualizationViewModel } from 'datavis-tech-presenters';
import { generateScreenshot } from './generateScreenshot';
import { resize } from './resize';
import { thumbnailDimensions, previewDimensions } from './dimensions';

export const defaultWaitTime = 10000;

export const generateImages = async (visualization, waitTime) => {
  const visualizationViewModel = new VisualizationViewModel(visualization);

  const screenshotBuffer = await generateScreenshot({
    visualizationViewModel,
    waitTime: waitTime || defaultWaitTime
  });

  const thumbnailBuffer = await resize({
    actualDimensions: visualizationViewModel,
    desiredDimensions: thumbnailDimensions,
    screenshotBuffer
  });

  return {
    thumbnail: thumbnailBuffer.toString('base64'),
    preview: screenshotBuffer.toString('base64')
  };
};
