import assert from 'assert';

export const toggleCodeEditor = my => async () => {
  const { page } = my;

  // Open editor.
  await (await page.waitFor('.test-toggle-editor')).click();
  await page.waitFor('.test-editor');

  // Open files section.
  await (await page.waitFor('.test-editor-files-section')).click();

  // Open a file.
  await (await page.waitFor('.test-editor-file-entry-index-html')).click();
  await page.waitFor('.test-code-editor');
  const fileName = await page.evaluate(
    () => document.querySelector('.test-code-editor-file-name').textContent
  );
  assert.equal(fileName, 'index.html');

  // Editor (sidebar) should still be open.
  await page.waitFor('.test-editor');

  // Close code editor.
  const closeNavigation = page.waitForNavigation();
  (await page.waitFor('.test-close-code-editor')).click();
  await closeNavigation;

  // Code editor should not be visible anymore.
  assert.equal(await page.$('.test-code-editor'), null);

  // Editor (sidebar) should still be open at this point.
  await page.waitFor('.test-editor');

  // Return to home state (wait for navigation to avoid race condition).
  const navigation = page.waitForNavigation();
  (await page.waitFor('.test-toggle-editor')).click();
  await navigation;
};
