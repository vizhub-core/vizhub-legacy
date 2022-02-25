// Inspired by https://github.com/curran/sharedb-racer-react-demo/blob/main/src/server.js
import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import http from 'http';
import { html } from './html';
import { App } from './App';

const port = 8080;

const app = express();

app.get('/', (req, res) => {
  const title = 'VizHub Community Edition';
  const pageData = { foo: 'bar' };
  const rootHTML = renderToString(<App pageData={pageData} />);

  res.send(html({ title, rootHTML, pageData }));
});

app.use(express.static(__dirname + '/public'));

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`VizHub listening at http://localhost:${port}`);
});
