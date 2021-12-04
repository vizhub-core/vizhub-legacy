// Let the loading animation play.
export const wait = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });
