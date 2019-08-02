export const navClick = async (page, selector) =>
  await Promise.all([
    page.waitForNavigation(),
    await (await page.waitFor(selector)).click()
  ]);
