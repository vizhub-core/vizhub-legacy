const webSocketURL =
  process.env.REACT_APP_VIZHUB_WEBSOCKET_URL || 'ws://localhost:4000';

export const createWebSocket = () => {
  const webSocket = new WebSocket(webSocketURL);

  webSocket.onopen = () => {
    console.log('onopen');
  };

  webSocket.onclose = event => {
    console.log('close');
    console.log(event);
  };

  webSocket.onerror = event => {
    // TODO surface these in UI?
    // TODO check if this is where the access control errors go
    console.log('error');
    console.log(event);
  };

  return webSocket;
};
