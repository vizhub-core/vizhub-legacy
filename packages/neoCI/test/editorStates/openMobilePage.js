import { devicesMap } from 'puppeteer/DeviceDescriptors';

export const openMobilePage = my => async () => {
  const mobilePage = await my.browser.newPage();
  await mobilePage.emulate(devicesMap['Galaxy S5']);
  await mobilePage.goto(my.forkedVizURL);
  my.mobilePage = mobilePage;
};
