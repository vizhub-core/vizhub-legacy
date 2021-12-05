export const signOut = (my) => async () => {
  const { page } = my;

  // Pop open the menu, so the sign out button appears.
  await (await page.waitFor('.test-avatar-me')).click();

  // Trigger sign out.
  await (await page.waitFor('.test-sign-out')).click();

  // If this appears, then the test passes. No assertions needed!
  await page.waitFor('.test-sign-in');
};
