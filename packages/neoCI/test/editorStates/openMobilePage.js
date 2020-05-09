import * as devices from 'puppeteer/DeviceDescriptors';

export const openMobilePage = my => async () => {
  const mobilePage = await my.browser.newPage();
  await mobilePage.emulate(devices['Galaxy S5']);
  await mobilePage.goto(my.forkedVizURL);
  my.mobilePage = mobilePage;
};
