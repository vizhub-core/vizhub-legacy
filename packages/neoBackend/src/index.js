import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { serverGateways } from 'vizhub-server-gateways';
import { apiController, jwtAuth } from 'vizhub-controllers';
import { serveFrontend } from './serveFrontend';
import { serveShareDB } from './serveShareDB';

const expressApp = express();
//expressApp.use(compression());
expressApp.use(bodyParser.json({ limit: '2mb' }));
expressApp.use(cookieParser());

const server = http.createServer(expressApp);

serveShareDB(server);

const gateways = serverGateways();
jwtAuth(expressApp, gateways.userGateway);
apiController(expressApp, gateways);

serveFrontend(expressApp);

const port = 4000;
server.listen(port);
console.log(`Listening at http://localhost:${port}`);
