import assert from 'assert';
import { convenience } from './convenience';

export const toggleFullScreen = (my, isMobile) => async () => {
  const { page, navClick } = convenience(my, isMobile);
  await navClick('.test-enter-fullscreen-from-viewer');
  await page.waitFor('.test-fullscreen');
  await navClick('.exit-fullscreen-from-fullscreen');
  assert.equal(await page.$('.test-fullscreen'), null);
};
