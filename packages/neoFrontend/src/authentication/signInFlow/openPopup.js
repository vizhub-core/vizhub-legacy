// Opens a popup window that uses OAuth to authenticate.
// The popup ends up at the route /authenticated (see Authenticated.js).
export const openPopup = (scopes=[]) => {
  let authUrl = '/auth';
  if (scopes) {
    if (scopes instanceof Array) {
      authUrl = authUrl.concat('?scopes=', scopes.join(' '));
    } else {
      authUrl = authUrl.concat('?scopes=', scopes);
    }
  }
  return window.open(authUrl, 'vizhub-auth');
};
