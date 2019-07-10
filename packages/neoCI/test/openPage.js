import assert from 'assert';
import puppeteer from 'puppeteer';
import { retry } from './retry';

const puppeteerOptions = { args: ['--no-sandbox'] };

// Use this for magic.
// Object.assign(puppeteerOptions, {
//   //slowMo: 500,
//   headless: false
// });

export const openPage = my => async () => {
  const browser = await puppeteer.launch(puppeteerOptions);
  const page = await browser.newPage();
  const response = await retry(() => page.goto('http://localhost:3000'), 2000);
  assert.equal(response.status(), 200);

  my.browser = browser;
  my.page = page;
};
