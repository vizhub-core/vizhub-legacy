export const listenForMe = (onMeReceived) => {
  window.addEventListener('message', ({ data }) => {
    if (data.vizHubAuthenticatedUser) {
      onMeReceived(data.vizHubAuthenticatedUser);
    }
  });
};
