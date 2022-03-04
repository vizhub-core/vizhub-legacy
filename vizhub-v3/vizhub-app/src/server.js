// Inspired by:
// https://github.com/curran/sharedb-racer-react-demo/blob/main/src/server.js
// https://github.com/vizhub-core/vizhub/blob/main/prototypes/open-core-first-attempt/packages/vizhub-core/src/server/index.js
import http from 'http';
import express from 'express';
import ShareDB from 'sharedb';
import json1 from 'ot-json1';
import WebSocket from 'ws';
import WebSocketJSONStream from '@teamwork/websocket-json-stream';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { DatabaseGateways } from 'vizhub-interactors';
import { html } from './html';
import { App } from './App';

const port = 8080;

const app = express();

ShareDB.types.register(json1.type);
// TODO test this out
//ShareDB.types.defaultType = json1.type;

const shareDBBackend = new ShareDB();

// Make the singleton server-side connection.
const shareDBConnection = shareDBBackend.connect();

// Initialize the server-side gateways.
const gateways = DatabaseGateways(shareDBConnection);

// TODO refactor this out of here
// TODO Insert fixtures from VizHub entities/interactors.
const doc = shareDBConnection.get('VizInfo', '1');
doc.fetch((err) => {
  if (err) throw err;
  if (doc.type === null) {
    doc.create({ content: 'test' }, json1.type.uri);
  }
});

// Serve the home page.
app.get('/', (req, res) => {
  const doc = shareDBConnection.get('VizInfo', '1');

  // TODO refactor this out of here
  doc.fetch((err) => {
    // TODO handle not found error --> 404 page
    if (err) throw err;
    const snapshot = doc.toSnapshot();
    const pageData = { snapshot };

    const rootHTML = renderToString(<App pageData={pageData} />);
    const title = 'VizHub Community Edition';
    res.send(html({ title, rootHTML, pageData }));
  });
});

app.use(express.static(__dirname + '/public'));

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  shareDBBackend.listen(new WebSocketJSONStream(ws));
});

server.listen(port, () => {
  console.log(`VizHub listening at http://localhost:${port}`);
});
