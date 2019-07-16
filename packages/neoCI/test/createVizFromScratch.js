import assert from 'assert';

export const createVizFromScratch = my => async () => {
  const { page } = my;
  const navigation = page.waitForNavigation();
  await (await page.waitFor('.test-create-viz-from-scratch')).click();

  // Navigate to /creating-viz-from-scratch
  await navigation;

  // Navigate to actual new viz URL.
  await page.waitForNavigation();
  const url = page.url();

  const split = url.split('/');
  const userName = split[3];
  const id = split[4];

  assert.equal(userName, 'ci');

  // Output the link for manual testing.
  console.log();
  console.log('Viz created from scratch:');
  console.log(url);
  console.log();

  // "Return" the id for future use.
  my.vizId = id;
};
