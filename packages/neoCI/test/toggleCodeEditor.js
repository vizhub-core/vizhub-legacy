import assert from 'assert';

const awaitNavigation = async (page, callback) => {
  const navigation = page.waitForNavigation();
  await callback();
  await navigation;
};

export const toggleCodeEditor = (my, isMobile) => async () => {
  const page = isMobile ? my.mobilePage : my.page;

  // Open editor.
  awaitNavigation(page, async () => {
    await (await page.waitFor('.test-toggle-editor')).click();
  });
  await page.waitFor('.test-editor');

  // Open files section.
  awaitNavigation(page, async () => {
    await (await page.waitFor('.test-editor-files-section')).click();
  });

  // Open a file.
  const openNavigation = page.waitForNavigation();
  await (await page.waitFor('.test-editor-file-entry-index-html')).click();
  await openNavigation;

  await page.waitFor('.test-code-editor');
  const fileName = await page.evaluate(
    () => document.querySelector('.test-code-editor-file-name').textContent
  );
  assert.equal(fileName, 'index.html');

  // Editor (sidebar) should still be open.
  await page.waitFor('.test-editor');

  // Close code editor.
  const closeNavigation = page.waitForNavigation();

  // There's a strange bug that happens around 5% of the time
  // where clicking on test-close-code-editor doesn't navigate.
  console.log('url before click: ' + page.url());
  await (await page.waitFor('.test-close-code-editor')).click();

  // URL after click should be different than before click.
  // If it's not, the 5% bug has been encountered,
  // and navigation will never happen. The test suite will fail.
  console.log('url after click:  ' + page.url());
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
