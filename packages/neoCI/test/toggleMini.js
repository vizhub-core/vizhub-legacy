import assert from 'assert';
import { convenience } from './convenience';

export const toggleMini = (my, isMobile) => async () => {
  const { page, navClick } = convenience(my, isMobile);
  await (await page.waitFor('.test-enter-mini-from-viewer')).click();

  if (!isMobile) {
    await page.waitFor('.test-mini');

    // If we're here then we're in mini mode.
    // Now test that mini mode persists across reload.
    await page.reload();
    await page.waitFor('.test-mini');
  }

  // Check that entering mini mode opens the editor on desktop.
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

  if (!isMobile) {
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
