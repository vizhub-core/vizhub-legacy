import JSONStream from '@teamwork/websocket-json-stream';
import WebSocket from 'ws';
import { getShareDB, getConnection } from 'vizhub-server-gateways';
import {
  identifyAgent,
  identifyOwner,
  accessControl
} from './shareDBMiddleware';

// Set up the ShareDB instance and WebSocket server.
export const serveShareDB = server => {
  // Set up the WebSocket server.
  const webSocketServer = new WebSocket.Server({ server });

  const shareDB = getShareDB();

  // Populates request.agent.userId or request.agent.isServer.
  //
  // This ShareDB middleware triggers when new connections are made,
  // whether from the browser or from the server.
  shareDB.use('connect', identifyAgent);

  // Populates request.owner with the user id of the owner of the document
  // to which the op is being applied.
  shareDB.use('apply', identifyOwner(getConnection()));

  // This middleware applies access control rules to all ops (changes).
  shareDB.use('apply', accessControl);

  // Set up new connections to interact with ShareDB.
  webSocketServer.on('connection', (ws, req) => {
    const stream = new JSONStream(ws);

    // Prevent server crashes on errors.
    stream.on('error', error => {
      console.log('WebSocket stream error: ' + error.message);
    });

    shareDB.listen(stream, req);
  });
};
