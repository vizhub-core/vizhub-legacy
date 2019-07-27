import assert from 'assert';

export const toggleEditor = (my, isMobile) => async () => {
  const page = isMobile ? my.mobilePage : my.page;
  await (await page.waitFor('.test-toggle-editor')).click();
  await page.waitFor('.test-editor');

  // The viewer should still be visible on desktop only.
  if (isMobile) {
    assert.equal(await page.$('.test-viewer'), null);
  } else {
    await page.waitFor('.test-viewer');
  }

  // If we're here then the editor opened.
  // Now test that the editor remains open on page load.
  await page.reload();
  await page.waitFor('.test-editor');

  // Test closing the editor.
  await (await page.waitFor('.test-toggle-editor')).click();
  assert.equal(await page.$('.test-editor'), null);
};
