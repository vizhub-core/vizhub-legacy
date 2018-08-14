import fs from 'fs';
import assert from 'assert';
import puppeteer from 'puppeteer';
import { autoSaveDebounceTime } from 'vizhub-ui';
import { ciUser } from 'datavis-tech-entities';
import { datasetRoute } from '../routes/routeGenerators';

// Testing technique inspired by https://medium.com/@dpark/ui-testing-with-puppeteer-and-mocha-8a5c6feb3407

const puppeteerOptions = { args: ['--no-sandbox'] };

// Use this for magic.
// Object.assign(puppeteerOptions, {
//   slowMo: 500,
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

      id = split[4]; // Grab the id of the vis we're editing.

      // Output the link for manual testing.
      console.log(`\nhttp://localhost:3000/ci/${id}\n`);
    });
  });

  describe('Edit Visualization', () => {
    let originalContent;
    it('should save new visualization content', async () => {
      originalContent = await page.evaluate(() =>
        document.querySelector('.test-code-editor').value
      );
      await page.type('.test-code-editor textarea', 'New content');
      await new Promise(resolve => {
        setTimeout(resolve, autoSaveDebounceTime + 500)
      });
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

  describe('Create Dataset', () => {
    it('should navigate to create dataset page', async () => {
      (await page.waitFor('.test-user-menu-button')).click(); // Open the menu.
      const navigation = page.waitForNavigation();
      (await page.waitFor('.test-user-menu-create-dataset-link', {
        visible: true // Wait until the link is visible (menu is opened).
      })).click();
      await navigation;
      assert.equal(page.url(), 'http://localhost:3000/upload-dataset');
    });
    it('should upload a dataset', async () => {
      const fileInput = await page.waitFor('.test-dataset-upload-file-input');
      await fileInput.uploadFile('test/flaring.csv');
      // const nameInput = await page.waitFor('.test-dataset-upload-name-input');
      // await nameInput.type('Natural Gas Flaring');
      await page.waitFor('.test-dataset-upload-source-input');
      
      await page.type('.test-dataset-upload-source-input', 'Flaring Central');
      await page.type('.test-dataset-upload-source-url-input', 'https://flaring.central/')

      const submitButton = await page.waitFor('.test-dataset-upload-submit');
      await submitButton.click();
      await page.waitForNavigation();
      const path = datasetRoute({ userName: 'ci', slug: 'flaring' });
      assert.equal(page.url(), 'http://localhost:3000' + path);

      // Output the link for manual testing.
      console.log(`\n${page.url()}\n`);
    });
  });

  describe('View Dataset', () => {
    it('should display dataset title', async () => {
      const text = await page.evaluate(() => (
        document.querySelector('.test-dataset-title').textContent)
      );
      assert.equal(text, 'Flaring');
    });

    it('should display dataset source', async () => {
      const text = await page.evaluate(() => (
        document.querySelector('.test-dataset-source').textContent)
      );
      assert.equal(text, 'Flaring Central');
    });

    it('should link to dataset source', async () => {
      const text = await page.evaluate(() => (
        document.querySelector('.test-dataset-source').href)
      );
      assert.equal(text, 'https://flaring.central/');
    });

    it('should download dataset', async () => {
      const downloadLink = await page.waitFor('.test-dataset-download-link');
      const downloadLinkHref = await page.evaluate(() => (
        document.querySelector('.test-dataset-download-link')
          .getAttribute('href')
      ));
      assert.equal(downloadLinkHref, 'http://localhost:3000/ci/datasets/flaring.csv');

      const csvText = await page.evaluate(() => (
        fetch('http://localhost:3000/ci/datasets/flaring.csv')
          .then(r => r.text())
      ));

      const fileName = 'test/flaring.csv';
      const expectedCsvText = fs.readFileSync(fileName, 'utf8');

      assert.equal(csvText, expectedCsvText);

    });
  });

  describe('Profile Page', () => {
    it('should navigate to profile page', async () => {
      (await page.waitFor('.test-user-menu-button')).click(); // Open the menu.
      const navigation = page.waitForNavigation();
      (await page.waitFor('.test-user-menu-profile-link', {
        visible: true // Wait until the link is visible (menu is opened).
      })).click();
      await navigation;
      assert.equal(page.url(), 'http://localhost:3000/ci');

      // Output the link for manual testing.
      console.log(`\n${page.url()}\n`);
    });
    it('should display full name of user', async () => {
      const text = await page.evaluate(() => (
        document.querySelector('.test-profile-full-name').textContent)
      );
      assert.equal(text, ciUser.fullName);
    });
    it('should display list of visualizations', async () => {
      const infoTitles = await page.evaluate(() => {
        const selector = '.test-profile-visualization-info-title';
        return Array.from(document.querySelectorAll(selector))
          .map(el => el.textContent);
      });
      assert.deepEqual(infoTitles, ['Untitled']);
    });
  });

  describe('tear down', () => {
    it('should close', async () => {
      await browser.close();
    });
  });

});
