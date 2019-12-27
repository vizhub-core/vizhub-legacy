import assert from 'assert';

export const vizNotFound = my => async () => {
  console.log('here');
  await my.page.reload();
  console.log('there');

  await my.page.waitFor('.test-viz-not-found');
};
