import WebSocket from 'ws';
import JSONStream from '@teamwork/websocket-json-stream';
import { getShareDB } from './shareDB'

const start = httpServer => {
  const webSocketServer = new WebSocket.Server({
    server: httpServer
  });

  webSocketServer.on('connection', webSocket => {
    getShareDB().listen(new JSONStream(webSocket));
  });
};

export const ShareDBServer = { start };
