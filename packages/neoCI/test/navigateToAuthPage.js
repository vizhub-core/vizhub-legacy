import assert from 'assert';

export const navigateToAuthPage = async (browser, page) => {
  // Access the authentication popup.
  // Draws from https://github.com/GoogleChrome/puppeteer/issues/2968#issuecomment-408526574
  const newPagePromise = new Promise(resolve =>
    browser.once('targetcreated', target => resolve(target.page()))
  );

  (await page.waitFor('.test-sign-in')).click();

  const popup = await newPagePromise;

  assert.equal(popup.url(), 'http://localhost:3000/auth');

  return popup;
};
