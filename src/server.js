import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { indexHTML } from './indexHTML';
import { App } from './App';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(indexHTML('SSR Title', renderToString(<App />)));
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
