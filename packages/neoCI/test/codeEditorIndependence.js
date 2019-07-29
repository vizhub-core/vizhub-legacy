import assert from 'assert';

export const codeEditorIndependence = my => async () => {
  const { page } = my;

  // Enter full editor mode.
  await (await page.waitFor('.test-toggle-editor')).click();
  await (await page.waitFor('.test-editor-files-section')).click();
  await (await page.waitFor('.test-editor-file-entry-index-html')).click();
  await (await page.waitFor('.test-enter-full-editor')).click();

  // Editor (sidebar) should still be open at this point.
  await page.waitFor('.test-editor');

  // If we close the editor (sidebar),
  const navigationToggleEditor = page.waitForNavigation();
  await (await page.waitFor('.test-toggle-editor')).click();
  await navigationToggleEditor;
  assert.equal(await page.$('.test-editor'), null);

  // the code editor should remain open,
  await page.waitFor('.test-code-editor');

  // and in full edit mode.
  assert.equal(await page.$('.test-viewer'), null);

  // When we exit full code editor mode,
  await (await page.waitFor('.test-exit-full-editor')).click();

  // the editor (sidebar) should remain closed.
  assert.equal(await page.$('.test-editor'), null);

  // Even in mini mode,
  const navigationEnterMini = page.waitForNavigation();
  await (await page.waitFor('.test-enter-mini-from-viewer')).click();
  await navigationEnterMini;

  // the editor (sidebar) should remain closed
  assert.equal(await page.$('.test-editor'), null);

  // while the code editor remains open.
  await page.waitFor('.test-code-editor');

  // Return to home state (wait for navigation to avoid race condition).
  await (await page.waitFor('.test-exit-full-editor')).click();
  const navigation = page.waitForNavigation();
  await (await page.waitFor('.test-close-code-editor')).click();
  await navigation;
};
