import assert from 'assert';

export const vizFound = (my) => async () => {
  await my.page.goto(my.privateVizURL);
  await my.page.waitFor('.test-viewer');
};
