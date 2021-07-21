import http from 'http';
import WebSocket from 'ws';
import express from 'express';
import ShareDB from 'sharedb';
import mongodb from 'mongodb';
import ShareDBMongo from 'sharedb-mongo';
import WebSocketJSONStream from '@teamwork/websocket-json-stream';

export const server = (plugins) => {
  // See:
  // https://share.github.io/sharedb/getting-started
  // https://github.com/share/sharedb-mongo
  const mongoURI =
    process.env.VIZHUB_MONGO_URI || 'mongodb://localhost:27017/vizhub';

  const db = ShareDBMongo({
    mongo: async (callback) => {
      const timeout = setTimeout(() => {
        console.log('\nHaving trouble connecting to the database...');
        console.log('Ensure that the database is running.');
        console.log(
          `VIZHUB_MONGO_URI environment variable is "${process.env.VIZHUB_MONGO_URI}"`
        );
        console.log(`Using Mongo URI "${mongoURI}".`);
        console.log('See README for setup details.');
        console.log('In dev on Linux, start MongoDB with:');
        console.log('\nsudo service mongod start\n');
      }, 4000);

      const mongoClient = new mongodb.MongoClient(mongoURI, {
        useUnifiedTopology: true,
      });
      const mongoDatabase = await mongoClient.connect();
      clearTimeout(timeout);
      callback(null, mongoDatabase);
    },
  });

  const backend = new ShareDB({ db });

  const shareDBConnection = backend.connect();
  const expressApp = express();
  const port = 8000;

  expressApp.use(express.static('public'));

  // TODO refactor into common module
  const pages = new Map(
    plugins
      .filter(({ pageComponent }) => pageComponent)
      .map(({ pageComponent }) => [pageComponent.name, pageComponent])
  );

  for (const plugin of plugins) {
    plugin.extendServer?.(expressApp, shareDBConnection, pages);
  }

  const server = http.createServer(expressApp);

  const wss = new WebSocket.Server({ server });
  wss.on('connection', (ws) => {
    backend.listen(new WebSocketJSONStream(ws));
  });

  server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};
