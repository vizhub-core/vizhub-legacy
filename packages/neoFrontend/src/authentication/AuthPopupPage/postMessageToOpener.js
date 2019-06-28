export const postMessageToOpener = vizHubAuthenticatedUser => {
  window.opener.postMessage(
    { vizHubAuthenticatedUser },
    window.opener.location
  );
};
