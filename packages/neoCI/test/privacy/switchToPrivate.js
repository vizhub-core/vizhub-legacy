import assert from 'assert';
import { navClick } from '../navClick';

export const switchToPrivate = my => async () => {
  await navClick(my.page, '.test-toggle-editor');
  await my.page.waitFor('.test-editor');

  await (await my.page.waitFor('.test-editor-settings')).click();
  (await my.page.waitFor('.test-privacy')).click();
};
