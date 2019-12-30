const protocol = process.env.NODE_ENV === 'development' ? 'ws' : 'wss'
const port = process.env.NODE_ENV === 'development' ? ':4000' : ''
const webSocketURL = `${protocol}://${window.location.hostname}${port}`;

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
