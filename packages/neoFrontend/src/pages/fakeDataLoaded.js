import { showSpinner } from '../constants';

const delay = showSpinner ? 1000 : 0;
export const fakeDataLoaded = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve('This is the fake data. Oh yeah.');
    }, delay);
  });
