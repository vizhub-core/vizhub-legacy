import assert from 'assert';

export const fork = my => async () => {
  const { page } = my;
  const navigation = page.waitForNavigation();
  await (await page.waitFor('.test-fork')).click();

  await page.waitForNavigation();
  const url = page.url();

  const split = url.split('/');
  const userName = split[3];
  const id = split[4];

  assert.equal(userName, 'ci');

  // Verify that a new id has been generated.
  assert.notEqual(my.vizId, id);

  // Output the link for manual testing.
  console.log();
  console.log('Forked viz:');
  console.log(url);
  console.log();
};
