import express from 'express';

export const server = (plugins) => {
  const expressApp = express();
  const port = 8080;

  for (const plugin of plugins) {
    plugin.extendServer?.(expressApp);
  }

  expressApp.use(express.static('public'));

  expressApp.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};
