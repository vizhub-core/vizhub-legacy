import { openPage } from './openPage';
import { authentication } from './authentication';
import { vizCreation } from './vizCreation';
import { editorStates } from './editorStates';
import { realtime } from './realtime';
import { privacy } from './privacy';

// Testing technique inspired by https://medium.com/@dpark/ui-testing-with-puppeteer-and-mocha-8a5c6feb3407
//
// Convention: All class names that are only used in tests are prefixed with "test-".

describe('VizHub End to End Tests', () => {
  // This object allows tests to be split into multiple files.
  // It contains properties that mutate as the tests flow.
  // C-style mutation of "output" arguments oh yeah!
  const my = {};

  describe('Setup', () => {
    it('should open page', openPage(my));
  });

  describe('Authentication', authentication(my));

  describe('Viz Creation', vizCreation(my));

  describe('Editor States', editorStates(my));

  //describe('Real Time', realtime(my));

  describe('Privacy', privacy(my));

  describe('Tear Down', () => {
    it('should close', async () => {
      await my.browser.close();
    });
  });
});
