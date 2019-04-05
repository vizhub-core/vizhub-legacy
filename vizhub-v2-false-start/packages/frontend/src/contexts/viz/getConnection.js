import { Connection } from 'sharedb/lib/client';
//import WebSocket from 'reconnecting-websocket';
import { webSocketURL } from '../../environment';

let connection;
const makeConnection = () => {
  const ws = new WebSocket(webSocketURL);

  ws.onopen = () => {
    console.log('onopen');
  };
  ws.onclose = event => {
    console.log('close');
    console.log(event);
  };
  // TODO consider timeout error for development,
  // as this fires only after 2 minutes.
  ws.onerror = event => {
    console.log('error');
    console.log(event);
  };

  connection = new Connection(ws);
  return connection;
};

//let i = 0;
//setInterval(() => console.log(i++), 1000);

//export const connection = new Connection(ws);
export const getConnection = () => connection || makeConnection();
