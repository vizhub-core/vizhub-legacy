export const createVizFromScratch = my => async () => {
  const { page } = my;
  //const navigation = page.waitForNavigation();
  await (await page.waitFor('.test-create-viz-from-scratch')).click();
  // await navigation;
  // const url = page.url();
  // const split = url.split('/');
  // assert.equal(split[3], 'ci');

  // id = split[4]; // Grab the id of the vis we're editing.

  // // Output the link for manual testing.
  // console.log(`\nhttp://localhost:3000/ci/${id}\n`);
};
