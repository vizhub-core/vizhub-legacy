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
import { DatabaseGateways, GetVizSnapshot } from 'vizhub-interactors';
import {
  VIZ_INFO_COLLECTION,
  VIZ_CONTENT_COLLECTION,
  VIZ_INFO_NOT_FOUND,
} from 'vizhub-interactors/constants';
import { App } from '../App';
import {
  HomePagePresenter,
  VizPagePresenter,
  LoginPagePresenter,
  //  ProfilePagePresenter,
} from '../presenters';
import { html } from './html';
import { vizBot } from './vizBot';
import { authentication } from './authentication';

const port = 3000;

const app = express();

ShareDB.types.register(json1.type);

const shareDBBackend = new ShareDB({ db: new ShareDBMingo() });

// Make the singleton server-side connection.
const shareDBConnection = shareDBBackend.connect();

// Initialize the server-side gateways.
const gateways = DatabaseGateways(shareDBConnection);

authentication(app, gateways);

const getVizSnapshot = GetVizSnapshot(gateways);

// Simulate users.
vizBot({ gateways, shareDBConnection });

// The number of VizInfo results per page of pagination (infinite scroll).
const paginationLimit = 100;

// Serve the home page.
app.get('/', async (req, res) => {
  console.log('req.user');
  console.log(req.user);

  const vizInfoSnapshots = await new Promise((resolve, reject) => {
    // TODO unify definition - add pagination
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

app.get('/login', (req, res, next) => {
  // TODO refactor this duplicated logic
  const pageData = { pageName: LoginPagePresenter.name };
  const rootHTML = renderToString(
    <SSRProvider>
      <App pageData={pageData} />
    </SSRProvider>
  );
  const title = 'Log in';
  res.send(html({ title, rootHTML, pageData }));
});

// TODO Profile Page
//
//   What's involved?
//
//    * Iterate User entity
//      * migrate fields from V2 (partially done)
//    * User CRUD methods in Gateways
//      * Add to Gateways interface (partially done)
//      * Gateways tests
//      * In memory implementation
//      * ShareDB implementation
//    * getUserByUserName method in Gateways
//      * Gateways tests
//      * In memory implementation
//      * ShareDB implementation
//
//
//
// TODO refactor to unify commonalities between here and '/'
//app.get('/:userName', async (req, res) => {
//  const { userName } = req.params;
//  const user = await getUserByUserName(userName);
//  const owner = user.id;
//
//  const vizInfoSnapshots = await new Promise((resolve, reject) => {
//    // TODO
//    // TODO unify definition
//    const query = shareDBConnection.createFetchQuery(
//      VIZ_INFO_COLLECTION,
//      { owner },
//      {},
//      (error, results) => {
//        // TODO verify that error handling works.
//        if (error) {
//          reject(error);
//        } else {
//          // results is an array of Doc instances with their data populated
//          resolve(results.map((doc) => doc.toSnapshot()));
//          query.destroy();
//        }
//      }
//    );
//  });
//
//  const pageData = {
//    pageName: ProfilePagePresenter.name,
//    vizInfoSnapshots,
//  };
//  const rootHTML = renderToString(
//    <SSRProvider>
//      <App pageData={pageData} />
//    </SSRProvider>
//  );
//  const title = user.res.send(html({ title, rootHTML, pageData }));
//});

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
