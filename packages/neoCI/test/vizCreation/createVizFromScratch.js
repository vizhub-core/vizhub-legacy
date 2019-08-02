import assert from 'assert';
import { navClick } from '../navClick';

export const createVizFromScratch = my => async () => {
  const { page } = my;

  // Navigate to /creating-viz-from-scratch
  await navClick(page, '.test-create-viz-from-scratch');

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
