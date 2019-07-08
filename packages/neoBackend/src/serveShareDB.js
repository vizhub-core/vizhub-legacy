import ShareDB from '@teamwork/sharedb';
import JSONStream from '@teamwork/websocket-json-stream';
import json0 from '@vizhub/ot-json0';
import WebSocket from 'ws';

// Use our custom json0 fork that implements presence.
ShareDB.types.register(json0.type);
ShareDB.types.defaultType = json0.type;

// Set up the ShareDB instance and WebSocket server.
export const serveShareDB = server => {
  // These options serve only to disable deprecation warnings.
  const options = {
    disableDocAction: true,
    disableSpaceDelimitedActions: true
  };

  // Create the singleton ShareDB instance.
  const share = new ShareDB(options);

  // Set up the WebSocket server.
  const webSocketServer = new WebSocket.Server({ server });

  // Set up new connections to interact with ShareDB.
  webSocketServer.on('connection', ws => {
    const stream = new JSONStream(ws);

    // Prevent server crashes on errors.
    stream.on('error', error => {
      console.log('WebSocket stream error: ' + error.message);
    });

    share.listen(stream);
  });

  return share;
};
