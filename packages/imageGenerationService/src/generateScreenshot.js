import { JSDOM } from 'jsdom';
import puppeteer from 'puppeteer';
import { computeSrcDoc, setJSDOM } from 'vizhub-presenters';

setJSDOM(JSDOM);

export const generateScreenshot = async ({ visualizationViewModel, waitTime }) => {
  const { width, height, files } = visualizationViewModel;

  const html = computeSrcDoc(files);
  try {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    await page.setViewport({ width, height });

    return await new Promise((resolve, reject) => {
      // Catch errors.
      // From https://github.com/GoogleChrome/puppeteer/issues/3709
      page.on('error', error => {
        console.log('got error event');
        reject( error );
      });

      page.setContent(html)
        .then(() => page.waitFor(waitTime))
        .then(() => page.screenshot())
        .then(screenshotBuffer => {
          return page.close()
            .then(() => browser.close())
            .then(() => resolve(screenshotBuffer))
	})
        .catch(reject);
    });

  } catch (error) {
    console.log('Caught screenshot generation error:');
    console.log(error);

    console.log('Using white image as thumbnail');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width, height });
    await page.setContent('<html></html>');
    const screenshotBuffer = await page.screenshot();
    await page.close();
    await browser.close();
    return screenshotBuffer;
  }
};
