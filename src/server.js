import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { indexHTML } from './indexHTML';
import { App } from './App';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send(indexHTML('Home Page', renderToString(<App />)));
});

app.use(express.static('public'));

app.get('/:userName/:vizId', (req, res) => {
  const { userName, vizId } = req.params;
  res.send(indexHTML('Viz page ' + userName + vizId, renderToString(<App />)));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
