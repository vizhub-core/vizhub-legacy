import assert from 'assert';
import { convenience } from './convenience';

export const toggleEditor = (my, isMobile) => async () => {
  const { page, navClick } = convenience(my, isMobile);
  await navClick('.test-toggle-editor');
  await page.waitFor('.test-editor');

  // The viewer should still be visible on desktop only.
  if (isMobile) {
    assert.equal(await page.$('.test-viewer'), null);
  } else {
    await page.waitFor('.test-viewer');
  }

  // Test closing the editor.
  await navClick('.test-toggle-editor');
  assert.equal(await page.$('.test-editor'), null);
};
