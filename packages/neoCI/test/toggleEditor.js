import assert from 'assert';

export const toggleEditor = my => async () => {
  const { page } = my;
  await (await page.waitFor('.test-toggle-editor')).click();
  await page.waitFor('.test-editor');

  // If we're here then the editor opened.
  // Now test that the editor remains open on page load.
  await page.reload();
  await page.waitFor('.test-editor');

  // Test closing the editor.
  await (await page.waitFor('.test-toggle-editor')).click();
  assert.equal(await page.$('.test-editor'), null);
};
