import assert from 'assert';
import puppeteer from 'puppeteer';

// Testing technique inspired by https://medium.com/@dpark/ui-testing-with-puppeteer-and-mocha-8a5c6feb3407

const puppeteerOptions = { args: ['--no-sandbox'] };

// Use this for magic.
// Object.assign(puppeteerOptions, {
//   //slowMo: 500,
//   headless: false
// });

const retry = (fn, ms) => new Promise(resolve => {
  fn()
    .then(resolve)
    .catch(() => {
      setTimeout(() => {
        console.log('retrying...');
        retry(fn, ms).then(resolve);
      }, ms);
    });
});

describe('Web', () => {
  let browser;
  let page;
  let id;

  describe('Setup', () => {
    it('should open page', async () => {
      browser = await puppeteer.launch(puppeteerOptions);
      page = await browser.newPage();
      const response = await retry(() => page.goto('http://localhost:3000'), 2000);
      assert.equal(response.status(), 200);
    });
  });

  describe('Authentication', () => {
    it('should navigate to auth page', async () => {
      const navigation = page.waitForNavigation();
      (await page.waitFor('.test-user-menu-sign-in-link')).click();
      await navigation;
      assert.equal(page.url(), 'http://localhost:3000/auth');
    });
    it('should authenticate as CI', async () => {
      await (await page.waitFor('.test-sign-in-as-ci')).click();
      await page.waitFor('.test-user-menu-button', { visible: true });
      const text = await page.evaluate(() => (
        document.querySelector('.test-user-menu-button').textContent)
      );
      assert.equal(text, 'CI');
    });
  });

  describe('Create Visualization', () => {
    it('should navigate to create visualization page', async () => {
      (await page.waitFor('.test-user-menu-button')).click(); // Open the menu.
      const navigation = page.waitForNavigation();
      (await page.waitFor('.test-user-menu-create-vis-link', {
        visible: true // Wait until the link is visible (menu is opened).
      })).click();
      await navigation;
      assert.equal(page.url(), 'http://localhost:3000/create-visualization');
    });
    it('should create visualization from scratch', async () => {
      const navigation = page.waitForNavigation();
      (await page.waitFor('.test-from-scratch-button')).click();
      await navigation;

      const url = page.url();
      const split = url.split('/');
      assert.equal(split[3], 'ci');
      assert.equal(split[5], 'edit');

      id = split[4]; // Grab the id of the vis we're editing.

      // Output the link for manual testing.
      console.log(`\nhttp://localhost:3000/ci/${id}/edit\n`);
    });
  });

  describe('Edit Visualization', () => {
    let originalContent;
    it('should save new visualization content', async () => {
      originalContent = await page.evaluate(() =>
        document.querySelector('.test-code-editor').value
      );
      await page.type('.test-code-editor textarea', 'New content');
      await page.keyboard.down('Shift');
      await page.keyboard.press('Enter');
      await page.keyboard.up('Shift');
    });
    it('should display newly saved content', async () => {
      await page.reload();
      await page.waitFor('.test-code-editor');
      const text = await page.evaluate(() =>
        document.querySelector('.test-code-editor').value
      );
      assert.equal(text, originalContent + 'New content');
    });
  });

  describe('View Visualization', () => {
    it('should navigate to visualization view', async () => {
      const response = await page.goto(`http://localhost:3000/ci/${id}`);
      assert.equal(response.status(), 200);
    });
    it('should display visualization title', async () => {
      const text = await page.evaluate(() => (
        document.querySelector('.test-document-title').textContent)
      );
      assert.equal(text, 'Untitled');
    });
  });

  describe('tear down', () => {
    it('should close', async () => {
      await browser.close();
    });
  });

});
