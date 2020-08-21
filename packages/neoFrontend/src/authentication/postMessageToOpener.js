export const postMessageToOpener = (vizHubAuthenticatedUser) => {
  console.log(window.opener.location);
  window.opener.postMessage(
    { vizHubAuthenticatedUser },
    window.opener.location
  );
};
