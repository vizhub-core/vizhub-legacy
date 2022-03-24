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
import { DatabaseGateways } from 'vizhub-interactors';
import { vizBot } from './vizBot';
import { authentication } from './authentication';
import { pages } from './pages';

const port = 3000;

const app = express();

ShareDB.types.register(json1.type);

const shareDBBackend = new ShareDB({ db: new ShareDBMingo() });

// Make the singleton server-side connection.
const shareDBConnection = shareDBBackend.connect();

// Initialize the server-side gateways.
const gateways = DatabaseGateways(shareDBConnection);

authentication({ app, gateways });

// Simulate users.
vizBot({ gateways, shareDBConnection });

// The number of VizInfo results per page of pagination (infinite scroll).
// const paginationLimit = 100;

pages({ app, gateways, shareDBConnection });

app.use(express.static(__dirname + '/public'));

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  shareDBBackend.listen(new WebSocketJSONStream(ws));
});

server.listen(port, () => {
  console.log(`VizHub listening at http://localhost:${port}`);
});
