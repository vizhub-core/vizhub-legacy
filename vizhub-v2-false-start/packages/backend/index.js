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

new WebSocket.Server({ server, path: '/api/websocket' }).on(
  'connection',
  ws => {
    console.log('connection made');
    share.listen(new JSONStream(ws));
  }
);

const connection = share.connect();

export const snapshot = ({ version, data }) => ({ v: version, data });

app.get('/api/studio/data/:vizId', (req, res) => {
  const { vizId } = req.params;
  const viz = connection.get('viz', vizId);
  viz.fetch(err => {
    if (err) {
      // TODO figure out when this error would occur. Missing DB connection?
      console.log('TODO test and handle this case');
      return res.setStatus(500).send(err);
    }
    if (viz.type === null) {
      return res.sendStatus(404);
    }
    const {
      userData,
      authenticatedUserId,
      ownerUserId,
      comments
    } = sampleStudioData;

    const vizSnapshots = {};
    vizSnapshots[vizId] = snapshot(viz);

    const studioData = {
      vizSnapshots,
      userData,
      authenticatedUserId,
      comments
    };
    //console.log(studioData);
    res.send(studioData);
  });
});

// Set up initial document for testing during development.
const initializeSampleStudioData = () => {
  const vizId = Object.keys(sampleStudioData.vizSnapshots)[0];
  const vizData = sampleStudioData.vizSnapshots[vizId].data;
  const viz = connection.get('viz', vizId);
  viz.fetch(err => {
    if (err) throw err;
    if (viz.type === null) {
      viz.create(vizData);
      return;
    }
  });
};

initializeSampleStudioData();

server.listen(4000);
