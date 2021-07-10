import express from 'express';

export const server = (plugins) => {
  const app = express();
  const port = 8080;

  console.log('TODO interface with plugins: ', plugins);

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};
