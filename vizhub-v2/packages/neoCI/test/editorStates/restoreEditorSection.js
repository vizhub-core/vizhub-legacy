import assert from 'assert';
import { getPage } from './getPage';
import { navClick } from '../navClick';

export const restoreEditorSection = (my, isMobile) => async () => {
  const page = getPage(my, isMobile);

  // Open the editor to the files section.
  await navClick(page, '.test-toggle-editor');
  //await navClick(page, '.test-editor-files-section');

  // Close and re-open the editor.
  await navClick(page, '.test-toggle-editor');
  await navClick(page, '.test-toggle-editor');

  // At this point, the files section should be open.
  await page.waitFor('.test-editor-file-entry-index-html');

  // Return to home state.
  //await navClick(page, '.test-editor-files-section');
  await navClick(page, '.test-toggle-editor');
};
