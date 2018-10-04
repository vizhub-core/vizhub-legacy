//import WebSocket from 'ws';
//import JSONStream from '@teamwork/websocket-json-stream';
//import { getShareDB } from './shareDB';
//
//  This is for later, when we use ShareDB in the client side.

const start = () => {
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
