import assert from 'assert';

export const toggleFullEditor = my => async () => {
  const { page } = my;

  // Make sure viewer is visible before entering full editor.
  await page.waitFor('.test-viewer');

  // Enter full editor mode.
  await (await page.waitFor('.test-enter-full-editor')).click();

  // Viewer should not be visible anymore.
  assert.equal(await page.$('.test-viewer'), null);

  // Exit full editor mode.
  await (await page.waitFor('.test-exit-full-editor')).click();

  // Viewer should again be visible.
  await page.waitFor('.test-viewer');
};
