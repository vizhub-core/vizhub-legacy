import { oAuthURL } from '../constants';

// Configure popup dimensions here (in pixels).
const popupWidth = 1000;
const popupHeight = 600;

// Opens a popup window that uses OAuth to authenticate.
// The popup ends up at the route /authenticated (see Authenticated.js).
export const openPopup = () => {
  const popupOptions = [
    'scrollbars=yes',
    `width=${popupWidth}`,
    `height=${popupHeight}`,
    `top=${window.innerHeight / 2 - popupHeight / 2}`,
    `left=${window.innerWidth / 2 - popupWidth / 2}`
  ].join(',');
  return window.open(oAuthURL, 'github-oauth-authorize', popupOptions);
};
