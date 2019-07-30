import { toggleEditor } from './toggleEditor';
import { toggleFullScreen } from './toggleFullScreen';
import { toggleMini } from './toggleMini';
import { toggleFullEditor } from './toggleFullEditor';
import { toggleCodeEditor } from './toggleCodeEditor';
import { verifyHomeState } from './verifyHomeState';
import { codeEditorIndependence } from './codeEditorIndependence';
import { openMobilePage } from './openMobilePage';
import { restoreEditorSection } from './restoreEditorSection';

export const editorStates = my => () => {
  describe('Desktop Editor States', () => {
    afterEach(verifyHomeState(my));
    it('should toggle editor', toggleEditor(my));
    it('should toggle fullscreen', toggleFullScreen(my));
    it('should toggle mini', toggleMini(my));
    it('should toggle code editor', toggleCodeEditor(my));
    it('should toggle full code editor mode', toggleFullEditor(my));
    it('should toggle code editor independently', codeEditorIndependence(my));
    it('should restore previous editor section', restoreEditorSection(my));
  });

  describe('Mobile Editor States', () => {
    before(openMobilePage(my));
    afterEach(verifyHomeState(my, true));
    it('should toggle editor', toggleEditor(my, true));
    it('should toggle fullscreen', toggleFullScreen(my, true));
    it('should toggle mini', toggleMini(my, true));
    it('should toggle code editor', toggleCodeEditor(my, true));
    it('should toggle full code editor mode', toggleFullEditor(my, true));
    //it('should toggle code editor independently') not relevant on mobile.
  });
};
