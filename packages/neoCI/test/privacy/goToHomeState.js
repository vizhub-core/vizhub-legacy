import assert from 'assert';
import { signOut } from '../authentication';

const HOME_URL = 'http://localhost:3000/';

// Put the pate into its "home state":
//  - At the home page
//  - Not authenticated
export const goToHomeState = my => async () => {
  const page = my.page;

  if (page.url() !== HOME_URL) {
    await page.goto(HOME_URL);
  }

  const isAuthenticated = await my.page.evaluate(
    el => el.getAttribute('data-test-is-authenticated') === 'true',
    await page.waitFor('.test-user-navbar-section')
  );

  if (isAuthenticated) {
    await signOut(my)();
  }
};
