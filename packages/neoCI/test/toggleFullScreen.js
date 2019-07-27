import assert from 'assert';

export const toggleFullScreen = my => async () => {
  const { page } = my;
  (await page.waitFor('.test-enter-fullscreen-from-viewer')).click();
  await page.waitFor('.test-fullscreen');

  // If we're here then we're full screen.
  // Now test that the full screen persists across reload.
  await page.reload();
  await page.waitFor('.test-fullscreen');

  await (await page.waitFor('.exit-fullscreen-from-fullscreen')).click();
  assert.equal(await page.$('.test-fullscreen'), null);
};
