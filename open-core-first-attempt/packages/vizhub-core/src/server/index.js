import http from 'http';
import WebSocket from 'ws';
import express from 'express';
import ShareDB from 'sharedb';
import mongodb from 'mongodb';
import redis from 'redis';
import ShareDBMongo from 'sharedb-mongo';
import WebSocketJSONStream from '@teamwork/websocket-json-stream';
import ShareDBRedisPubSub from 'sharedb-redis-pubsub';
import { getPages } from '../isomorphic/getPages';

export const server = (serverPlugins) => {
  // See:
  // https://share.github.io/sharedb/getting-started
  // https://github.com/share/sharedb-mongo
  const mongoURI =
    process.env.VIZHUB_MONGO_URI || 'mongodb://localhost:27017/vizhub';

  const redisHost = process.env.VIZHUB_REDIS_HOST;

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

  const shareDBOptions = { db };

  if (redisHost) {
    shareDBOptions.pubsub = ShareDBRedisPubSub({
      client: redis.createClient({ host: redisHost }),
    });
  }

  const shareDBBackend = new ShareDB(shareDBOptions);

  const shareDBConnection = shareDBBackend.connect();
  const expressApp = express();
  const port = 8000;

  expressApp.use(express.static('public'));

  const pages = getPages(serverPlugins);

  for (const plugin of serverPlugins) {
    plugin.extendServer?.({
      expressApp,
      pages,
      shareDBConnection,
      shareDBBackend,
    });
  }

  const server = http.createServer(expressApp);

  const wss = new WebSocket.Server({ server });
  wss.on('connection', (ws) => {
    shareDBBackend.listen(new WebSocketJSONStream(ws));
  });

  server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};
