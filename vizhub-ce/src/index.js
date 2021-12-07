// Inspired by archive/vizhub-v3-false-start/src/server/index.js

import express from 'express';

const app = express();
const port = 8080;

app.use(express.static('public'));

app.get('/:userName/:vizId', async (req, res) => {
  const { userName, vizId } = req.params;
  console.log(userName, vizId);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
