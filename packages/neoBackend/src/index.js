import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { serverGateways } from 'vizhub-server-gateways';
import { apiController } from 'vizhub-controllers';
import { serveFrontend } from './serveFrontend';
//import { serveShareDB } from './serveShareDB';
import { auth } from './auth';

const expressApp = express();
expressApp.use(compression());
expressApp.use(bodyParser.json());
expressApp.use(cookieParser());

const server = http.createServer(expressApp);

//serveShareDB(server);
//const share = serveShareDB(server);
//const connection = share.connect();

const gateways = serverGateways();
auth(expressApp, gateways.userGateway);
apiController(expressApp, gateways);

serveFrontend(expressApp);

const port = 4000;
server.listen(port);
console.log(`Listening at http://localhost:${port}`);
