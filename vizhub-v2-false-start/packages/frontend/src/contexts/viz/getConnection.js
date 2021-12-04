import ShareDB, { Connection } from '@teamwork/sharedb/lib/client';
import json0 from '@datavis-tech/ot-json0';
import { webSocketURL } from '../../environment';

// TODO isolate this in vizhub-common
ShareDB.types.register(json0.type);
ShareDB.types.defaultType = json0.type;

// App-wide global singleton.
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

  ws.onerror = event => {
    console.log('error');
    console.log(event);
  };

  connection = new Connection(ws);
  return connection;
};

//export const connection = new Connection(ws);
export const getConnection = () => connection || makeConnection();
