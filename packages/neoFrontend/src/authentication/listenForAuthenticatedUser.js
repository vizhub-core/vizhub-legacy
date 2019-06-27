export const listenForAuthenticatedUser = onAuthenticatedUserReceived => {
  window.addEventListener('message', ({ data }) => {
    const user = data.vizHubAuthenticatedUser;
    if (user) {
      onAuthenticatedUserReceived(user);
    }
  });
};
