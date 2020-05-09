import { minSpinnerTime } from '../constants';

export const fakeDataLoaded = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('This is the fake data. Oh yeah.');
    }, minSpinnerTime);
  });
