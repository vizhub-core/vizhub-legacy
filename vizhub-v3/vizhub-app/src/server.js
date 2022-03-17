// Inspired by:
// https://github.com/curran/sharedb-racer-react-demo/blob/main/src/server.js
// https://github.com/vizhub-core/vizhub/blob/main/prototypes/open-core-first-attempt/packages/vizhub-core/src/server/index.js
import http from 'http';
import express from 'express';
import ShareDB from 'sharedb';
import ShareDBMingo from 'sharedb-mingo-memory';
import json1 from 'ot-json1';
import WebSocket from 'ws';
import WebSocketJSONStream from '@teamwork/websocket-json-stream';
import React from 'react';
import { renderToString } from 'react-dom/server';
import SSRProvider from 'react-bootstrap/SSRProvider';
import { DatabaseGateways, SaveViz, GetVizSnapshot } from 'vizhub-interactors';
import { primordialViz } from 'vizhub-interactors/test/fixtures';
import { App } from './App';
import { html } from './html';
import { HomePagePresenter, VizPagePresenter } from './presenters';

const port = 8080;

const app = express();

ShareDB.types.register(json1.type);

const shareDBBackend = new ShareDB({ db: new ShareDBMingo() });

// Make the singleton server-side connection.
const shareDBConnection = shareDBBackend.connect();

// Sanity check - this works.
//const vizDoc = shareDBConnection.get('vizInfo', 'viz1');
//vizDoc.subscribe();
//vizDoc.on('op batch', () => {
//  console.log(vizDoc.data);
//});

// Initialize the server-side gateways.
const gateways = DatabaseGateways(shareDBConnection);
const getVizSnapshot = GetVizSnapshot(gateways);
const saveViz = SaveViz(gateways);

// Initialize the database with sample content.
saveViz(primordialViz);

// Test real-time updates.
setInterval(() => {
  gateways.saveVizInfo({ ...primordialViz.vizInfo, title: '' + Math.random() });
}, 1000);

// Serve the home page.
app.get('/', async (req, res) => {
  const pageData = { pageName: HomePagePresenter.name };
  const rootHTML = renderToString(
    <SSRProvider>
      <App pageData={pageData} />
    </SSRProvider>
  );
  const title = 'VizHub Community Edition';
  res.send(html({ title, rootHTML, pageData }));
});

// Serve the viz page.
app.get('/:userName/:vizId', async (req, res) => {
  // TODO if viz owner does not match userName,
  // redirect to the correct username.
  const vizSnapshot = await getVizSnapshot(primordialViz.id);
  const pageData = {
    pageName: VizPagePresenter.name,
    vizSnapshot: await getVizSnapshot(primordialViz.id),
  };
  const rootHTML = renderToString(
    <SSRProvider>
      <App pageData={pageData} />
    </SSRProvider>
  );
  const title = 'VizHub Community Edition';
  res.send(html({ title, rootHTML, pageData }));
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
