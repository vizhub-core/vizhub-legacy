import http from 'http';
import WebSocket from 'ws';
import express from 'express';
import ShareDB from 'sharedb';
import mongodb from 'mongodb';
import ShareDBMongo from 'sharedb-mongo';
import WebSocketJSONStream from '@teamwork/websocket-json-stream';

// See:
// https://share.github.io/sharedb/getting-started
// https://github.com/share/sharedb-mongo

const mongoURI =
  process.env.VIZHUB_MONGO_URI || 'mongodb://localhost:27017/vizhub';

const db = ShareDBMongo({
  mongo: (callback) => {
    const mongoClient = new mongodb.MongoClient(mongoURI, {
      useUnifiedTopology: true,
    });
    mongoClient.connect(callback);
  },
});

const backend = new ShareDB({ db });

const shareDBConnection = backend.connect();

export const server = (plugins) => {
  const expressApp = express();
  const port = 8000;

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
