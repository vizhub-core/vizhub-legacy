import assert from 'assert';

export const authAsCI = async (popup, page) => {
  await (await popup.waitFor('.test-sign-in-as-ci')).click();
  await page.waitFor('.test-avatar-me');
  const alt = await page.evaluate(
    () => document.querySelector('.test-avatar-me').alt
  );
  assert(alt === 'ci');
};
