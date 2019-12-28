import { navClick } from '../navClick';

export const setupPrivateViz = my => async () => {
  // Make a fresh viz so we can mess around.
  const { page } = my;

  await navClick(page, '.test-fork');

  const url = page.url();
  const split = url.split('/');
  const id = split[4];

  // Output the link for manual testing.
  console.log();
  console.log('Privacy testing viz:');
  console.log(url);
  console.log();

  // Stash the URL for later mobile testing.
  my.privateVizURL = url;
  my.privateVizId = id;
};
