import assert from 'assert';
import { getPage } from './getPage';
import { navClick } from '../navClick';

export const codeEditorIndependence = (my, isMobile) => async () => {
  const page = getPage(my, isMobile);

  // Enter full editor mode.
  await navClick(page, '.test-toggle-editor');
  //await navClick(page, '.test-editor-files-section');
  await navClick(page, '.test-editor-file-entry-index-html');
  await navClick(page, '.test-enter-full-editor');

  // Editor (sidebar) should still be open at this point.
  await page.waitFor('.test-editor');

  // If we close the editor (sidebar),
  await navClick(page, '.test-toggle-editor');
  assert.equal(await page.$('.test-editor'), null);

  // the code editor should remain open,
  await page.waitFor('.test-code-editor');

  // and in full edit mode.
  assert.equal(await page.$('.test-viewer'), null);

  // When we exit full code editor mode,
  await (await page.waitFor('.test-exit-full-editor')).click();

  // the editor (sidebar) should remain closed.
  assert.equal(await page.$('.test-editor'), null);

  // Even in mini mode,
  await navClick(page, '.test-enter-mini-from-viewer');

  // the editor (sidebar) should remain closed
  assert.equal(await page.$('.test-editor'), null);

  // while the code editor remains open.
  await page.waitFor('.test-code-editor');

  // Return to home state.
  await navClick(page, '.test-exit-full-editor');
  await navClick(page, '.test-close-code-editor');
  await navClick(page, '.test-toggle-editor');
  //await navClick(page, '.test-editor-files-section');
  await navClick(page, '.test-toggle-editor');
};
