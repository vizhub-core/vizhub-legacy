import { Connection } from 'sharedb/lib/client';
import WebSocket from 'reconnecting-websocket';

const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const url = protocol + '//' + window.location.host;
const ws = new WebSocket(url);

ws.onerror = error => {
  console.log(error);
};

export const connection = new Connection(ws);
