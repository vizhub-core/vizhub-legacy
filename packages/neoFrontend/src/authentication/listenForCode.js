// Listens for the OAuth code received from the popup.
export const listenForCode = onCodeReceived => {
  window.addEventListener('message', ({data}) => {
    const code = data.vizHubOAuthCode;
    if (code) {
      onCodeReceived(code);
    }
  });
};
