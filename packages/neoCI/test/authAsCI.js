import assert from 'assert';

// TODO rename to signIn
export const authAsCI = my => async () => {
  const { popup, page } = my;
  await (await popup.waitFor('.test-sign-in-as-ci')).click();
  await page.waitFor('.test-avatar-me');
  const alt = await page.evaluate(
    () => document.querySelector('.test-avatar-me').alt
  );
  assert(alt === 'ci');
};
