import assert from 'assert';
import { getPage } from './getPage';
import { navClick } from '../navClick';

export const toggleFullScreen = (my, isMobile) => async () => {
  const page = getPage(my, isMobile);
  await navClick(page, '.test-enter-fullscreen-from-viewer');
  await page.waitFor('.test-fullscreen');
  await navClick(page, '.exit-fullscreen-from-fullscreen');
  assert.equal(await page.$('.test-fullscreen'), null);
};
