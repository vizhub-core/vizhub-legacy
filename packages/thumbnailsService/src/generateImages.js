import { VisualizationViewModel } from 'datavis-tech-presenters';
import { generateScreenshot } from './generateScreenshot';
//import { resize } from './resize';

export const generateImages = async visualization => {
  const visualizationViewModel = new VisualizationViewModel(visualization);

  const screenshotBuffer = await generateScreenshot({
    visualizationViewModel
  });

  console.log(screenshotBuffer.toString('base64'));

  //const thumbnailBuffer = resize({
  //  visualizationViewModel,
  //  screenshotBuffer,
  //  thumbnailDimensions
  //});

  //const previewBuffer = resize({
  //  visualizationViewModel,
  //  screenshotBuffer,
  //  previewDimensions
  //});

  return {
    thumbnail: 'fdsa',
    preview: 'fdas'
    //thumbnail: resize(screenshot, thumbnailDimensions)
    //preview: resize(screenshot, previewDimensions)
  };
};
