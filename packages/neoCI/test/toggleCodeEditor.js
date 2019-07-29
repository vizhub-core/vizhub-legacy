import assert from 'assert';

//export const awaitNavigation = async (page, callback) => {
//  const navigation = page.waitForNavigation();
//  await callback();
//  await navigation;
//};

const convenience = (my, isMobile) => {
  const page = isMobile ? my.mobilePage : my.page;
  const navClick = async selector =>
    await Promise.all([
      page.waitForNavigation(),
      await (await page.waitFor(selector)).click()
    ]);
  return { page, navClick };
};

export const toggleCodeEditor = (my, isMobile) => async () => {
  const { page, navClick } = convenience(my, isMobile);

  // Open editor.
  await navClick('.test-toggle-editor');
  await page.waitFor('.test-editor');

  // Open files section.
  await navClick('.test-editor-files-section');

  // Open a file.
  await navClick('.test-editor-file-entry-index-html');

  await page.waitFor('.test-code-editor');
  const fileName = await page.evaluate(
    () => document.querySelector('.test-code-editor-file-name').textContent
  );
  assert.equal(fileName, 'index.html');

  // Editor (sidebar) should still be open.
  await page.waitFor('.test-editor');

  // Close code editor.
  // There's a strange bug that happens around 5% of the time
  // where clicking on test-close-code-editor doesn't navigate.
  // URL after click should be different than before click.
  // If it's not, the 5% bug has been encountered,
  // and navigation will never happen. The test suite will fail.
  console.log('before closing code editor');

  // This timeout here appears to make this bug go away.
  // No idea why.
  await new Promise(resolve => setTimeout(resolve, 100));

  await navClick('.test-close-code-editor');
  console.log('after closing code editor');

  // Code editor should not be visible anymore.
  assert.equal(await page.$('.test-code-editor'), null);

  // Editor (sidebar) should still be open at this point.
  await page.waitFor('.test-editor');

  // Return to home state.
  await navClick('.test-toggle-editor');
};
