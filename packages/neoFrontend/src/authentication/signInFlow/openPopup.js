// Opens a popup window that uses OAuth to authenticate.
// The popup ends up at the route /authenticated (see Authenticated.js).
export const openPopup = () => {
  return window.open('/auth', 'vithub-auth');
};
