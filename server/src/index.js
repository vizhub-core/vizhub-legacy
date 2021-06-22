import express from 'express';
import fs from 'fs';
const app = express();
const port = 3000;

const indexHTML = fs.readFileSync('./client/src/index.html', 'utf8');

console.log(indexHTML);

app.get('/', (req, res) => {
  res.send(indexHTML);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
