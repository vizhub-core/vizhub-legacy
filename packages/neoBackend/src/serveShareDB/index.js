import JSONStream from '@teamwork/websocket-json-stream';
import WebSocket from 'ws';
import { getShareDB } from 'vizhub-server-gateways';
import { shareDBMiddleware } from './shareDBMiddleware';

// Set up the ShareDB instance and WebSocket server.
export const serveShareDB = (server) => {
  // Set up the WebSocket server.
  const webSocketServer = new WebSocket.Server({ server });

  // Initialize ShareDB.
  const shareDB = getShareDB();

  // Set up ShareDB middleware for access control and such.
  shareDBMiddleware(shareDB);

  // Set up new connections to interact with ShareDB.
  webSocketServer.on('connection', (ws, req) => {
    const stream = new JSONStream(ws);

    // Prevent server crashes on errors.
    stream.on('error', (error) => {
      console.log('WebSocket stream error: ' + error.message);
    });

    shareDB.listen(stream, req);
  });
};
