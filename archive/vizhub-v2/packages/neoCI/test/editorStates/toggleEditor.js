import assert from 'assert';
import { getPage } from './getPage';
import { navClick } from '../navClick';

export const toggleEditor = (my, isMobile) => async () => {
  const page = getPage(my, isMobile);
  await navClick(page, '.test-toggle-editor');
  await page.waitFor('.test-editor');

  // The viewer should still be visible on desktop only.
  if (isMobile) {
    assert.equal(await page.$('.test-viewer'), null);
  } else {
    await page.waitFor('.test-viewer');
  }

  // Test closing the editor.
  await navClick(page, '.test-toggle-editor');
  assert.equal(await page.$('.test-editor'), null);
};
