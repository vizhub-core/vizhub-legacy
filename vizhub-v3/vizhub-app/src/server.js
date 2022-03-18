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
import {
  DatabaseGateways,
  SaveViz,
  GetVizSnapshot,
  ForkViz,
  DeleteViz,
} from 'vizhub-interactors';
import {
  VIZ_INFO_COLLECTION,
  VIZ_CONTENT_COLLECTION,
  VIZ_INFO_NOT_FOUND,
} from 'vizhub-interactors/constants';
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

// Initialize the server-side gateways.
const gateways = DatabaseGateways(shareDBConnection);
const getVizSnapshot = GetVizSnapshot(gateways);
const saveViz = SaveViz(gateways);

// Initialize the database with sample content.
saveViz(primordialViz);

// Gets a random viz id.
const randomVizId = () =>
  new Promise((resolve, reject) => {
    shareDBConnection.createFetchQuery(
      VIZ_INFO_COLLECTION,
      {},
      {},
      (error, results) => {
        if (results.length > 0) {
          const i = Math.floor(Math.random() * results.length);
          const vizId = results[i].data.id;
          resolve(vizId);
        } else {
          resolve(null);
        }
      }
    );
  });

// Test real-time updates of the title.
setInterval(async () => {
  const vizId = await randomVizId();
  const vizInfo = (await gateways.getVizInfoSnapshot(vizId)).data;
  gateways.saveVizInfo({ ...vizInfo, title: '' + Math.random() });
}, 1000);

// Fork a random viz repeatedly
// to test real-time updates when adding entries to query results.
const forkViz = ForkViz(gateways);
setInterval(async () => {
  const newVizId = 'viz' + Math.random();
  const newOwner = 'user' + Math.random();
  const forkedFrom = await randomVizId();
  const timestamp = Date.now() / 1000;

  forkViz({ newVizId, newOwner, forkedFrom, timestamp });
}, 2000);

// Periodically delete a random viz.
// to test real-time updates when removing entries to query results.
const deleteViz = DeleteViz(gateways);
setInterval(async () => {
  const vizId = await randomVizId();
  console.log('Deleting ' + vizId);
  if (vizId) {
    deleteViz(vizId);
  }
}, 3000);

// Serve the home page.
app.get('/', async (req, res) => {
  // The number of VizInfo results per page of pagination (infinite scroll).
  const paginationLimit = 100;

  const vizInfoSnapshots = await new Promise((resolve, reject) => {
    // TODO unify definition
    const query = shareDBConnection.createFetchQuery(
      VIZ_INFO_COLLECTION,
      {},
      {},
      (error, results) => {
        // TODO verify that error handling works.
        if (error) {
          reject(error);
        } else {
          // results is an array of Doc instances with their data populated
          resolve(results.map((doc) => doc.toSnapshot()));
          query.destroy();
        }
      }
    );
  });

  const pageData = {
    pageName: HomePagePresenter.name,
    vizInfoSnapshots,
  };
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

  try {
    const { vizId } = req.params;
    const vizSnapshot = await getVizSnapshot(vizId);
    const pageData = {
      pageName: VizPagePresenter.name,
      vizSnapshot: await getVizSnapshot(vizId),
    };
    const rootHTML = renderToString(
      <SSRProvider>
        <App pageData={pageData} />
      </SSRProvider>
    );
    const title = 'VizHub Community Edition';
    res.send(html({ title, rootHTML, pageData }));
  } catch (error) {
    if (error.code === VIZ_INFO_NOT_FOUND) {
      // TODO custom 404 page
      res.status(404).send('Viz not found!');
    } else {
      // TODO custom 500 page
      throw error;
      res.status(500).send(error.message + '\n' + error.code);
    }
  }
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
