import assert from 'assert';
import { convenience } from './convenience';

export const toggleFullEditor = (my, isMobile) => async () => {
  const { page, navClick } = convenience(my, isMobile);

  // Open editor and file.
  await navClick('.test-toggle-editor');
  await navClick('.test-editor-files-section');
  await navClick('.test-editor-file-entry-index-html');

  if (isMobile){
    // Full editor button should not be visible on mobile.
    assert.equal(await page.$('.test-enter-full-editor'), null);

    // Return to home state.
    await navClick('.test-close-code-editor-mobile');
    await navClick('.test-toggle-editor');
  } else {
    // Make sure viewer is visible before entering full editor.
    await page.waitFor('.test-viewer');

    // Enter full editor mode.
    await navClick('.test-enter-full-editor');

    // Viewer should not be visible anymore.
    assert.equal(await page.$('.test-viewer'), null);

    // Exit full editor mode.
    await navClick('.test-exit-full-editor');

    // Viewer should again be visible.
    await page.waitFor('.test-viewer');

    // Return to home state.
    await navClick('.test-close-code-editor');
    await navClick('.test-toggle-editor');
  }
};
