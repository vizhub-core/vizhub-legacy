import assert from 'assert';
import { navClick } from '../navClick';

export const navigateToCreateVizPage = my => async () => {
  const { page } = my;

  // Pop open the menu, so the "create visualization" button appears.
  await (await page.waitFor('.test-avatar-me')).click();

  await navClick(page, '.test-create-viz');

  assert.equal(page.url(), 'http://localhost:3000/create-viz');
};
