import http from 'http';
import WebSocket from 'ws';
import express from 'express';
import ShareDB from 'sharedb';
import WebSocketJSONStream from '@teamwork/websocket-json-stream';

// See https://share.github.io/sharedb/getting-started
const backend = new ShareDB();
const shareDBConnection = backend.connect();

export const server = (plugins) => {
  const expressApp = express();
  const port = 8080;

  for (const plugin of plugins) {
    plugin.extendServer?.(expressApp, shareDBConnection);
  }

  expressApp.use(express.static('public'));

  const server = http.createServer(expressApp);

  const wss = new WebSocket.Server({ server });
  wss.on('connection', (ws) => {
    backend.listen(new WebSocketJSONStream(ws));
  });

  server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};
