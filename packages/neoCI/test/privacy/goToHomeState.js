import assert from 'assert';
import { signOut } from '../authentication';

// Put the pate into its "home state":
//  - At the home page
//  - Not authenticated
export const goToHomeState = (my, isMobile) => async () => {
  const page = my.page;

  await page.goto('http://localhost:3000');

  const isAuthenticated = await my.page.evaluate(
    el => el.getAttribute('data-test-is-authenticated') === 'true',
    await page.waitFor('.test-user-navbar-section')
  );

  if (isAuthenticated) {
    await signOut(my)();
  }
};
