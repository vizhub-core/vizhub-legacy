import assert from 'assert';
import { getPage } from './getPage';
import { navClick } from '../navClick';

export const toggleFullEditor = (my, isMobile) => async () => {
  const page = getPage(my, isMobile);

  // Open editor and file.
  await navClick(page, '.test-toggle-editor');
  //await navClick(page, '.test-editor-files-section');
  await navClick(page, '.test-editor-file-entry-index-html');

  if (isMobile) {
    // Full editor button should not be visible on mobile.
    assert.equal(await page.$('.test-enter-full-editor'), null);

    // Return to home state.
    await navClick(page, '.test-close-code-editor-mobile');
  } else {
    // Make sure viewer is visible before entering full editor.
    await page.waitFor('.test-viewer');

    // Enter full editor mode.
    await navClick(page, '.test-enter-full-editor');

    // Viewer should not be visible anymore.
    assert.equal(await page.$('.test-viewer'), null);

    // Exit full editor mode.
    await navClick(page, '.test-exit-full-editor');

    // Viewer should again be visible.
    await page.waitFor('.test-viewer');

    // Return to home state.
    await navClick(page, '.test-close-code-editor');
  }
  // Return to home state.
  //await navClick(page, '.test-editor-files-section');
  await navClick(page, '.test-toggle-editor');
};
