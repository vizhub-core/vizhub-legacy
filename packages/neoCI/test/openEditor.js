import assert from 'assert';

export const openEditor = my => async () => {
  const { page } = my;
  (await page.waitFor('.test-toggle-editor')).click();
  await page.waitFor('.test-editor');

  // If we're here then the editor opened.
  // Now test that the editor remains open on page load.
  await page.reload();
  await page.waitFor('.test-editor');
};
