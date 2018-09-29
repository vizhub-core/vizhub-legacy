import { computeSrcDoc } from 'vizhub-ui';
import puppeteer from 'puppeteer';

const imageGenerationWaitTime = 2000;

export const generateScreenshot = async ({ visualizationViewModel }) => {
  const { width, height, files } = visualizationViewModel;
  console.log(files);
  const html = computeSrcDoc(files);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log(visualizationViewModel);
  console.log({html});

  await page.setViewport({ width, height });
  await page.setContent(html);
  await page.waitFor(imageGenerationWaitTime);

  const screenshotBuffer = await page.screenshot();
  await page.close();

  return screenshotBuffer;
};
