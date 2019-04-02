import http from 'http';
import WebSocket from 'ws';
import express from 'express';
import ShareDB from 'sharedb';
import JSONStream from '@teamwork/websocket-json-stream';

const app = express();

const share = new ShareDB({
  disableDocAction: true,
  disableSpaceDelimitedActions: true
});

const connection = share.connect();

const server = http.createServer(app);

new WebSocket.Server({ server }).on('connection', ws => {
  console.log('connection');
  share.listen(new JSONStream(ws));
});

server.listen(4000);
