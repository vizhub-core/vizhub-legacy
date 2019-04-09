import ShareDB from 'sharedb';
import WebSocket from 'ws';
import JSONStream from 'websocket-json-stream';

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
