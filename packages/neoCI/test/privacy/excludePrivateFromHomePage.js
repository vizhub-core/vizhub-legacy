import assert from 'assert';

export const excludePrivateFromHomePage = my => async () => {
  const page = my.page;

  await page.waitFor('.test-home-page-viz-previews');

  const vizIdList = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        '.test-home-page-viz-previews .test-viz-preview'
      ),
      el => el.getAttribute('data-test-viz-id')
    )
  );

  const privateVizIsShown = vizIdList.includes(my.privateVizId);

  assert.equal(privateVizIsShown, false);
};
