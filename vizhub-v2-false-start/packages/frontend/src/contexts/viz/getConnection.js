import { Connection } from 'sharedb/lib/client';
//import WebSocket from 'reconnecting-websocket';

let connection;
const makeConnection = () => {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  //const url = protocol + '//' + window.location.host + '/api/websocket';

  // TODO this is a mess
  const url = protocol + '//' + 'localhost:4000' + '/api/websocket';
  const ws = new WebSocket(url);

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
