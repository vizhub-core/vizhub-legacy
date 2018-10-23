import { computeSrcDoc } from 'vizhub-ui';
import puppeteer from 'puppeteer';

export const generateScreenshot = async ({ visualizationViewModel, waitTime }) => {
  const { width, height, files } = visualizationViewModel;

  const html = computeSrcDoc(files);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width, height });
  await page.setContent(html);
  await page.waitFor(waitTime);

  const screenshotBuffer = await page.screenshot();
  await page.close();

  return screenshotBuffer;
};
