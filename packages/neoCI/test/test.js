import { openPage } from './openPage';
import { navigateToAuthPage } from './navigateToAuthPage';
import { authAsCI } from './authAsCI';
import { signOut } from './signOut';
import { navigateToCreateVizPage } from './navigateToCreateVizPage';
import { createVizFromScratch } from './createVizFromScratch';
import { fork } from './fork';
import { toggleEditor } from './toggleEditor';
import { toggleFullScreen } from './toggleFullScreen';
// import { autoSaveDebounceTime } from 'vizhub-ui';
// import { ciUser } from 'vizhub-entities';

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

  describe('Authentication', () => {
    it('should navigate to auth page', navigateToAuthPage(my));
    it('should authenticate as CI', authAsCI(my));
    it('should sign out', signOut(my));
    it('should navigate to auth page a second time', navigateToAuthPage(my));
    it('should authenticate as CI a second time', authAsCI(my));
  });

  describe('Create Visualization', () => {
    it('should navigate to create viz page', navigateToCreateVizPage(my));
    it('should create viz from scratch', createVizFromScratch(my));
  });

  describe('Fork Visualization', () => {
    it('should fork visualization', fork(my));
  });

  describe('Desktop UX', () => {
    it('should toggle editor', toggleEditor(my));
    it('should toggle fullscreen', toggleFullScreen(my));
  });

  describe('Tear Down', () => {
    it('should close', async () => {
      await my.browser.close();
    });
  });
});
