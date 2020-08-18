export const postMessageToOpener = (vizHubAuthenticatedUser) => {
  console.log(vizHubAuthenticatedUser);
  window.opener.postMessage(
    { vizHubAuthenticatedUser },
    window.opener.location
  );
};
