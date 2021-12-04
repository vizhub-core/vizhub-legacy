export const avoidBackend = false;
export const avoidShareDB = avoidBackend;
// You can put the following in your .env file:
// REACT_APP_WEBSOCKET_URL="ws://vizhub.myDomain.com"
export const webSocketURL =
  process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:4000';
export const enablePresence = true; //false;
