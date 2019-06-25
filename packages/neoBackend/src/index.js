import http from 'http';
import express from 'express';
import compression from 'compression';
import { serveFrontend } from './serveFrontend';
import { serveShareDB } from './serveShareDB';

const app = express();
const server = http.createServer(app);
const share = serveShareDB(server);
const connection = share.connect();

app.use(compression());
serveFrontend(app);

const port = 4000;
server.listen(port);
console.log(`Listening at http://localhost:${port}`);
