import assert from 'assert';
import { navClick } from '../navClick';

export const fork = my => async () => {
  const { page } = my;

  await navClick(page, '.test-fork');

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
  console.log(url + '?edit=files&file=index.html');
  console.log();

  // Stash the URL for later testing.
  my.forkedVizURL = url;
};
