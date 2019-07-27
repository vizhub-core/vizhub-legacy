import assert from 'assert';

// Verify that the viz view page is in its "home state",
// namely the same state it's in when you load a viz:
//  - Editor closed
//  - Code editor closed
//  - Not in mini mode
//  - Not in fullscreen mode
export const verifyHomeState = my => async () => {
  const { page } = my;
  await page.waitFor('.test-viewer');
  assert.equal(await page.$('.test-editor'), null);
  assert.equal(await page.$('.test-code-editor'), null);
  assert.equal(await page.$('.test-mini'), null);
  assert.equal(await page.$('.test-fullscreen'), null);
};
