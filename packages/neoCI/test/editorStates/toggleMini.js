import assert from 'assert';
import { convenience } from './convenience';

export const toggleMini = (my, isMobile) => async () => {
  const { page, navClick } = convenience(my, isMobile);
  await navClick('.test-enter-mini-from-viewer');

  if (!isMobile) {
    await page.waitFor('.test-mini');
  }

  // Check that entering mini mode opens the editor on desktop, not mobile.
  if (isMobile) {
    assert.equal(await page.$('.test-editor'), null);
  } else {
    await page.waitFor('.test-editor');
  }

  // Check that entering mini mode opens the default file.
  await page.waitFor('.test-code-editor');
  const fileName = await page.evaluate(
    () => document.querySelector('.test-code-editor-file-name').textContent
  );
  assert.equal(fileName, 'index.html');

  if (isMobile) {
    // Close the active file.
    await navClick('.test-close-code-editor-mobile');

    // Closing the active file should reveal the editor.
    await page.waitFor('.test-editor');

    // Return to home state.
    await navClick('.test-toggle-editor');
  } else {
    // Test exiting mini, which closes the mini viewer,
    // but keeps the editor and code editor open.
    await navClick('.exit-mini-from-mini');
    assert.equal(await page.$('.test-mini'), null);
    await page.waitFor('.test-code-editor');
    await page.waitFor('.test-editor');

    // Return to home state.
    await navClick('.test-close-code-editor');
    await navClick('.test-toggle-editor');
  }
};
