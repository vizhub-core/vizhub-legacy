import { createServer } from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import next from 'next';
import nextAuth from 'next-auth';
import favicon from 'serve-favicon';
import path from 'path';

import { routes } from '../routes';
import nextAuthConfig from './next-auth.config';
// import { ShareDBServer } from './shareDBServer';
import accountAPI from './api/account';

import { apiController, userController } from 'datavis-tech-controllers';

import { serverGateways } from 'vizhub-server-gateways';
import { setupRaven } from './setupRaven';

// Load environment variables from .env file if present
require('dotenv').config();

process.on('uncaughtException', function(err) {
  console.error('Uncaught Exception: ', err);
});

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection: Promise:', p, 'Reason:', reason);
});

process.env.PORT = process.env.PORT || 3000;

console.log(`NODE_ENV is ${process.env.NODE_ENV}`);
console.log(`PORT is ${process.env.PORT}`);

// Initialize Next.js
const nextApp = next({
  dir: '.',
  dev: (process.env.NODE_ENV === 'development')
});

const gateways = serverGateways();

const expressApp = express();

expressApp.use(bodyParser.json({
  limit: '5mb'
}));
expressApp.use(bodyParser.urlencoded({
  extended: true,
}));

// Add next-auth to next app
nextApp
  .prepare()
  .then(nextAuthConfig(userController(gateways.userGateway), expressApp))
  .then(nextAuthOptions => nextAuth(nextApp, nextAuthOptions))
  .then(nextAuthOptions => {

    expressApp.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

    setupRaven(expressApp);

    accountAPI(expressApp, nextAuthOptions.functions);

    apiController(expressApp, gateways);

    expressApp.all('*', routes.getRequestHandler(nextApp));

    const httpServer = createServer(expressApp);

    // Start the WebSocket ShareDB server.
    // ShareDBServer.start(httpServer);

    httpServer
      .listen(process.env.PORT, err => {
        if (err) {
          throw err;
        }
        console.log([
          '> Ready on http://localhost:',
          process.env.PORT,
          ' [' + process.env.NODE_ENV + ']'
        ].join(''));
      });
  })
  .catch(err => {
    console.log('An error occurred, unable to start the server');
    console.log(err);
  });
