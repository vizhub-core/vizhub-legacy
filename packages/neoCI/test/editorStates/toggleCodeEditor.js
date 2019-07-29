import assert from 'assert';
import { convenience } from './convenience';

export const toggleCodeEditor = (my, isMobile) => async () => {
  const { page, navClick } = convenience(my, isMobile);

  // Open editor.
  await navClick('.test-toggle-editor');
  await page.waitFor('.test-editor');

  // Open files section.
  await navClick('.test-editor-files-section');

  // Open a file.
  await navClick('.test-editor-file-entry-index-html');

  // Verify the name of the open file.
  await page.waitFor('.test-code-editor');
  const fileName = await page.evaluate(
    () => document.querySelector('.test-code-editor-file-name').textContent
  );
  assert.equal(fileName, 'index.html');

  // Editor (sidebar) should still be open on desktop, not on mobile.
  if (isMobile) {
    assert.equal(await page.$('.test-editor'), null);
  } else {
    await page.waitFor('.test-editor');
  }

  // Close code editor.
  // There's a strange bug that happens around 5% of the time
  // where clicking on test-close-code-editor doesn't navigate.
  // URL after click should be different than before click.
  // If it's not, the 5% bug has been encountered,
  // and navigation will never happen. The test suite will fail.
  //console.log('before closing code editor');

  // This timeout here seems to make the problem go away.
  // No idea why. Must be a race condition somewhere.
  // Possibilities:
  //  - react-router might be providing something stale.
  //  - viz runner iframe animation is disturbing clicking.
  await new Promise(resolve => setTimeout(resolve, 700));

  if (isMobile) {
    await navClick('.test-close-code-editor-mobile');
  } else {
    await navClick('.test-close-code-editor');
  }

  // Code editor should not be visible anymore.
  assert.equal(await page.$('.test-code-editor'), null);

  // Editor (sidebar) should still be open at this point.
  await page.waitFor('.test-editor');

  // Return to home state.
  await navClick('.test-toggle-editor');
};
