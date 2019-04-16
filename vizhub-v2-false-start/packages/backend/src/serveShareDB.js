import ShareDB from '@teamwork/sharedb';
import json0 from '@datavis-tech/ot-json0';
import WebSocket from 'ws';
import JSONStream from 'websocket-json-stream';

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
    share.listen(new JSONStream(ws));
  });

  return share;
};
