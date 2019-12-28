import assert from 'assert';
import { navigateToAuthPage } from './navigateToAuthPage';

export const signIn = my => async () => {
  await navigateToAuthPage(my)();

  const { popup, page } = my;
  await (await popup.waitFor('.test-sign-in-as-ci')).click();
  await page.waitFor('.test-avatar-me');
  const alt = await page.evaluate(
    () => document.querySelector('.test-avatar-me').alt
  );
  assert.equal(alt, 'ci');
};
