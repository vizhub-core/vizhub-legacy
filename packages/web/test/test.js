import assert from 'assert';
import puppeteer from 'puppeteer';

// Testing technique inspired by https://medium.com/@dpark/ui-testing-with-puppeteer-and-mocha-8a5c6feb3407


const puppeteerOptions = { args: ['--no-sandbox'] };

// Use this for magic.
// Object.assign(puppeteerOptions, { slowMo: 500, headless: false });

const retry = (fn, ms) => new Promise(resolve => {
  fn()
    .then(resolve)
    .catch(() => {
      setTimeout(() => {
        console.log('retrying...');
        retry(fn, ms).then(resolve);
      }, ms);
    })
});


describe('Web', () => {
  let browser;
  let page;

  describe('set up', () => {
    it('should open page', async () => {
      browser = await puppeteer.launch(puppeteerOptions);
      page = await browser.newPage();
      const response = await retry(() => page.goto('http://localhost:3000'), 1000);
      assert.equal(response.status(), 200);
    });
  });

  describe('authentication', () => {
    it('should navigate to auth page', async () => {
      const selector = '.test-user-menu-sign-in-link';
      await page.waitFor(selector);
      const navigation = page.waitForNavigation();
      page.click(selector);
      await navigation;
      assert.equal(page.url(), 'http://localhost:3000/auth');
    });
  });

  describe('tear down', () => {
    it('should close', async () => {
      await browser.close();
    });
  });

});
