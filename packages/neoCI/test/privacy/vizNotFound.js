import assert from 'assert';

export const vizNotFound = my => async () => {
  await my.page.reload();
  await my.page.waitFor('.test-viz-not-found');
};
