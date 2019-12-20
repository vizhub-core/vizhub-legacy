import assert from 'assert';

export const vizNotFound = my => async () => {
  await my.page.goto(my.privateVizURL);
  await my.page.waitFor('.test-viz-not-found');
};
