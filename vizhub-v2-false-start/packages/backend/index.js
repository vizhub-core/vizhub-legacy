import http from 'http';
import WebSocket from 'ws';
import express from 'express';
import ShareDB from 'sharedb';
import JSONStream from '@teamwork/websocket-json-stream';
import { sampleStudioData } from 'vizhub-core';

const app = express();

const share = new ShareDB({
  disableDocAction: true,
  disableSpaceDelimitedActions: true
});

const server = http.createServer(app);

new WebSocket.Server({ server }).on('connection', ws => {
  share.listen(new JSONStream(ws));
});

const connection = share.connect();

app.get('/api/studio/data/:vizId', (req, res) => {
  console.log(req.params.vizId);
  res.send(sampleStudioData);
});

// Set up initial document for testing during development.
const initializeSampleStudioData = () => {
  const vizId = Object.keys(sampleStudioData.vizData)[0];
  const viz = connection.get('viz', vizId);
  viz.fetch(err => {
    if (err) throw err;
    if (viz.type === null) {
      viz.create(sampleStudioData.vizData[vizId]);
      return;
    }
  });
};

server.listen(4000);
