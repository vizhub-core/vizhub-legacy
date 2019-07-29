import assert from 'assert';
import { convenience } from './convenience';

export const restoreEditorSection = (my, isMobile) => async () => {
  const { page, navClick } = convenience(my, isMobile);

  // Open the editor to the files section.
  await navClick('.test-toggle-editor');
  await navClick('.test-editor-files-section');

  // Close and re-open the editor.
  await navClick('.test-toggle-editor');
  await navClick('.test-toggle-editor');

  // At this point, the files section should be open.
  await page.waitFor('.test-editor-file-entry-index-html');

  // Return to home state.
  await navClick('.test-toggle-editor');
};
