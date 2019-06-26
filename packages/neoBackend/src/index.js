import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import { serveFrontend } from './serveFrontend';
import { serveShareDB } from './serveShareDB';
import { serveAuthAPI } from './serveAuthAPI';

const app = express();
app.use(compression());
app.use(bodyParser.json());

serveAuthAPI(app);
serveFrontend(app);

const server = http.createServer(app);
const share = serveShareDB(server);
//const connection = share.connect();

const port = 4000;
server.listen(port);
console.log(`Listening at http://localhost:${port}`);
