import assert from 'assert';
import { getPage } from './getPage';
import { navClick } from '../navClick';

export const toggleCodeEditor = (my, isMobile) => async () => {
  const page = getPage(my, isMobile);

  // Open editor.
  await navClick(page, '.test-toggle-editor');
  await page.waitFor('.test-editor');

  // The following test should be reinstated when the visual editor is introduced.
  // Currently, the files section is open automatically, which may not be the case in the future.
  // Open files section.
  //await navClick(page, '.test-editor-files-section');

  // Open a file.
  await navClick(page, '.test-editor-file-entry-index-html');

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
  if (isMobile) {
    await navClick(page, '.test-close-code-editor-mobile');
  } else {
    await navClick(page, '.test-close-code-editor');
  }

  // Code editor should not be visible anymore.
  assert.equal(await page.$('.test-code-editor'), null);

  // Editor (sidebar) should still be open at this point.
  await page.waitFor('.test-editor');

  // Return to home state.
  //await navClick(page, '.test-editor-files-section');
  await navClick(page, '.test-toggle-editor');
};
