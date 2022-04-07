import http from 'http';
import express from 'express';
import ShareDB from 'sharedb';
import json1 from 'ot-json1';
import { WebSocketServer } from 'ws';
import WebSocketJSONStream from '@teamwork/websocket-json-stream';

// A minimal ShareDB server setup just to demonstrate/validate the setup.
ShareDB.types.register(json1.type);
const port = 3000;
const app = express();
const shareDBBackend = new ShareDB();
const shareDBConnection = shareDBBackend.connect();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static('.'));

wss.on('connection', (ws) => {
  shareDBBackend.listen(new WebSocketJSONStream(ws));
});

// Create initial document
const shareDBDoc = shareDBConnection.get('testCollection', 'testDocId');
shareDBDoc.create(
  {
    content: { files: { 2432: { text: 'Hello vizhub-codemirror' } } },
  },
  json1.type.uri
);

server.listen(port, () => {
  console.log(`vizhub-codemirror demo listening at http://localhost:${port}`);
});
