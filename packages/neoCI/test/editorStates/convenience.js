export const convenience = (my, isMobile) => {
  const page = isMobile ? my.mobilePage : my.page;

  const navClick = async selector =>
    await Promise.all([
      page.waitForNavigation(),
      await (await page.waitFor(selector)).click()
    ]);

  return { page, navClick };
};
