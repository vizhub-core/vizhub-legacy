import assert from 'assert';
import puppeteer from 'puppeteer';

// Testing technique inspired by https://medium.com/@dpark/ui-testing-with-puppeteer-and-mocha-8a5c6feb3407

describe('Web', () => {
  let browser;
  let page;

  describe('set up', () => {
    it('should open page', async () => {
      browser = await puppeteer.launch({ headless: false });
      page = await browser.newPage();
      const response = await page.goto('http://localhost:3000', {
        timeout: 0,
        waitUntil: 'domcontentloaded'
      });
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
      await new Promise(resolve => setTimeout(resolve, 5000))
      await browser.close();
    });
  });

});
