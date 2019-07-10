import assert from 'assert';

export const navigateToCreateVizPage = my => async () => {
  const { page } = my;

  // Pop open the menu, so the "create visualization" button appears.
  await (await page.waitFor('.test-avatar-me')).click();

  const navigation = page.waitForNavigation();
  await (await page.waitFor('.test-create-viz')).click();
  await navigation;
  assert.equal(page.url(), 'http://localhost:3000/create-viz');
};
