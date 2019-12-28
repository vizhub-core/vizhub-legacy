import assert from 'assert';

export const excludePrivateFromHomePage = my => async () => {
  const page = await my.browser.newPage();
  await page.goto('http://localhost:3000');

  await page.waitFor('.test-home-page-viz-previews');

  const vizIdList = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.test-viz-preview'), el =>
      el.getAttribute('data-test-viz-id')
    )
  );

  const privateVizIsShown = vizIdList.includes(my.privateVizId);

  assert.equal(privateVizIsShown, false);

  await page.close();
};
