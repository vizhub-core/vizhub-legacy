import JSONStream from '@teamwork/websocket-json-stream';
import WebSocket from 'ws';
import { getShareDB } from 'vizhub-server-gateways';

// Set up the ShareDB instance and WebSocket server.
export const serveShareDB = server => {
  // Set up the WebSocket server.
  const webSocketServer = new WebSocket.Server({ server });

  // Set up new connections to interact with ShareDB.
  webSocketServer.on('connection', ws => {
    const stream = new JSONStream(ws);

    // Prevent server crashes on errors.
    stream.on('error', error => {
      console.log('WebSocket stream error: ' + error.message);
    });

    getShareDB().listen(stream);
  });
};
