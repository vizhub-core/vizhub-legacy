import http from 'http';
import express from 'express';
import { serveFrontend } from './serveFrontend';
import { serveShareDB } from './serveShareDB';
import { serveStudioData } from './serveStudioData';
import { initializeSampleStudioData } from './initializeSampleStudioData';

const app = express();
const server = http.createServer(app);
const share = serveShareDB(server);
const connection = share.connect();
initializeSampleStudioData(connection);
app.get('/api/studio/data/:vizId', serveStudioData(connection));
serveFrontend(app);

const port = 4000;
server.listen(port);
console.log(`Listening at http://localhost:${port}`);
