const webSocketURL =
  process.env.REACT_APP_VIZHUB_WEBSOCKET_URL || 'ws://localhost:4000';

export const createWebSocket = ({ onOpen, onClose, onError }) => {
  const webSocket = new WebSocket(webSocketURL);

  if (onOpen) {
    webSocket.addEventListener('open', onOpen);
  }

  if (onClose) {
    webSocket.addEventListener('close', onClose);
  }

  if (onError) {
    webSocket.addEventListener('error', onError);
  }

  return webSocket;
};
