import ShareDB from '@teamwork/sharedb';
import JSONStream from '@teamwork/websocket-json-stream';
import json0 from '@datavis-tech/ot-json0';
import WebSocket from 'ws';

// TODO isolate this in vizhub-common
ShareDB.types.register(json0.type);
ShareDB.types.defaultType = json0.type;

// Set up the ShareDB instance and WebSocket server.
export const serveShareDB = server => {
  const share = new ShareDB({
    disableDocAction: true,
    disableSpaceDelimitedActions: true
  });

  new WebSocket.Server({ server }).on('connection', ws => {
    const stream = new JSONStream(ws);

    // Prevent server crashes on errors.
    stream.on('error', error => {
      console.log('WebSocket stream error: ' + error.message);
    });

    share.listen(stream);
  });

  return share;
};
