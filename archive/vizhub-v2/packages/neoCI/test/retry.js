export const retry = (fn, ms) =>
  new Promise((resolve) => {
    fn()
      .then(resolve)
      .catch(() => {
        setTimeout(() => {
          console.log('retrying...');
          retry(fn, ms).then(resolve);
        }, ms);
      });
  });
