import ShareDB, { Connection } from '@teamwork/sharedb/lib/client';
import json0 from '@datavis-tech/ot-json0';
export const webSocketURL =
  process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:4000';

// Register our custom OT type (that implements presence) as the default.
ShareDB.types.register(json0.type);
ShareDB.types.defaultType = json0.type;

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

export const connection = new Connection(ws);
