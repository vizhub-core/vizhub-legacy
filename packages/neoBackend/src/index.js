import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { serveFrontend } from './serveFrontend';
import { serveShareDB } from './serveShareDB';
import { auth } from './auth';

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

auth(app);
serveFrontend(app);

const server = http.createServer(app);

serveShareDB(server);
//const share = serveShareDB(server);
//const connection = share.connect();

const port = 4000;
server.listen(port);
console.log(`Listening at http://localhost:${port}`);
