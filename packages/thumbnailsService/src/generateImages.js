import { VisualizationViewModel } from 'datavis-tech-presenters';
import { generateScreenshot } from './generateScreenshot';
import { resize } from './resize';

const thumbnailDimensions = {
  width: 230,
  height: 120
};

export const generateImages = async visualization => {
  const visualizationViewModel = new VisualizationViewModel(visualization);

  const screenshotBuffer = await generateScreenshot({
    visualizationViewModel
  });

  const thumbnailBuffer = await resize({
    desiredDimensions: thumbnailDimensions,
    visualizationViewModel,
    screenshotBuffer
  });

  //const previewBuffer = resize({
  //  visualizationViewModel,
  //  screenshotBuffer,
  //  previewDimensions
  //});

  return {
    thumbnail: thumbnailBuffer.toString('base64'),
    preview: 'fdas'
    //thumbnail: resize(screenshot, thumbnailDimensions)
    //preview: resize(screenshot, previewDimensions)
  };
};
