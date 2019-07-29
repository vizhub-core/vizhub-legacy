import { openPage } from './openPage';
import { openMobilePage } from './openMobilePage';
import { navigateToAuthPage } from './navigateToAuthPage';
import { authAsCI } from './authAsCI';
import { signOut } from './signOut';
import { navigateToCreateVizPage } from './navigateToCreateVizPage';
import { createVizFromScratch } from './createVizFromScratch';
import { fork } from './fork';
import { toggleEditor } from './toggleEditor';
import { toggleFullScreen } from './toggleFullScreen';
import { toggleMini } from './toggleMini';
import { toggleFullEditor } from './toggleFullEditor';
import { toggleCodeEditor } from './toggleCodeEditor';
import { verifyHomeState } from './verifyHomeState';
import { codeEditorIndependence } from './codeEditorIndependence';
// import { autoSaveDebounceTime } from 'vizhub-ui';
// import { ciUser } from 'vizhub-entities';

// Testing technique inspired by https://medium.com/@dpark/ui-testing-with-puppeteer-and-mocha-8a5c6feb3407
//
// Convention: All class names that are only used in tests are prefixed with "test-".

const authentication = my => {
  describe('Authentication', () => {
    it('should navigate to auth page', navigateToAuthPage(my));
    it('should authenticate as CI', authAsCI(my));
    it('should sign out', signOut(my));
    it('should navigate to auth page a second time', navigateToAuthPage(my));
    it('should authenticate as CI a second time', authAsCI(my));
  });
};

const vizCreation = my => {
  describe('Viz Creation', () => {
    describe('Create Visualization', () => {
      it('should navigate to create viz page', navigateToCreateVizPage(my));
      it('should create viz from scratch', createVizFromScratch(my));
    });

    describe('Fork Visualization', () => {
      it('should fork visualization', fork(my));
    });
  });
}

const editorStates = my => {
  describe('Editor States', () => {
    describe('Desktop Editor States', () => {
      afterEach(verifyHomeState(my));
      it('should toggle editor', toggleEditor(my));
      it('should toggle fullscreen', toggleFullScreen(my));
      it('should toggle mini', toggleMini(my));
      it('should toggle code editor', toggleCodeEditor(my));
      it('should toggle full code editor mode', toggleFullEditor(my));
      it('should toggle code editor independently', codeEditorIndependence(my));
    });

    describe('Mobile Editor States', () => {
      afterEach(verifyHomeState(my, true));
      it('should open mobile page', openMobilePage(my));
      it('should toggle editor', toggleEditor(my, true));
      it('should toggle fullscreen', toggleFullScreen(my, true));
      //it('should toggle mini', toggleMini(my, true));
      // it('should toggle code editor', toggleCodeEditor(my, true));
      //it('should toggle full code editor mode', toggleFullEditor(my));
      //it('should toggle code editor independently', codeEditorIndependence(my));
    });
  });
};

describe('VizHub End to End Tests', () => {
  // This object allows tests to be split into multiple files.
  // It contains properties that mutate as the tests flow.
  // C-style mutation of "output" arguments oh yeah!
  const my = {};

  describe('Setup', () => {
    it('should open page', openPage(my));
  });

  authentication(my);

  vizCreation(my);

  editorStates(my);

  describe('Tear Down', () => {
    it('should close', async () => {
      await my.browser.close();
    });
  });
});
