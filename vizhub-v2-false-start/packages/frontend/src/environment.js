export const avoidBackend = false;
export const avoidShareDB = avoidBackend;
export const webSocketURL =
  process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:4000';
export const enablePresence = true; //false;
