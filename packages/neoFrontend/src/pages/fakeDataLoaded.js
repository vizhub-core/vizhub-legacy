const delay = process.env.NODE_ENV === 'development' ? 0 : 1000;
//const delay = 1000000;
export const fakeDataLoaded = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve('This is the fake data. Oh yeah.');
    }, delay);
  });
