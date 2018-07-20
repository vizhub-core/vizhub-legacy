import { createServer } from 'http';
import next from 'next';
import nextAuth from 'next-auth';

import { routes } from '../routes';
import nextAuthConfig from './next-auth.config';
// import { ShareDBServer } from './shareDBServer';
import accountAPI from './api/account';

import { visualizationController } from 'datavis-tech-controllers';
import { serverGateways } from './serverGateways';
import { setupRaven } from './setupRaven';

// Load environment variables from .env file if present
require('dotenv').load();

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

// Add next-auth to next app
nextApp
  .prepare()
  .then(nextAuthConfig)
  .then(nextAuthOptions => nextAuth(nextApp, nextAuthOptions))
  .then(nextAuthOptions => {
    const expressApp = nextAuthOptions.expressApp;

    setupRaven(expressApp);

    accountAPI(expressApp, nextAuthOptions.functions);

    // Set up the server-side gateways and controller.
    const { visualizationGateway } = serverGateways();
    visualizationController(expressApp, visualizationGateway);

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
