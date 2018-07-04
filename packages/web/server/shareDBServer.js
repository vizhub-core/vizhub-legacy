import WebSocket from 'ws';
import JSONStream from '@teamwork/websocket-json-stream';
import { getShareDB } from './shareDB'

const start = httpServer => {
  throw new Error('ShareDB server not implemented');
  // TODO figure out where to put this. Separate package?
  // const webSocketServer = new WebSocket.Server({
  //   server: httpServer
  // });

  // webSocketServer.on('connection', webSocket => {
  //   getShareDB().listen(new JSONStream(webSocket));
  // });
};

export const ShareDBServer = { start };
