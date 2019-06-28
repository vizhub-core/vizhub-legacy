import { openPopup } from './openPopup';
import { listenForMe } from './listenForMe';
import { AUTH_PENDING } from '../constants';

// Implements a popup-based OAuth sign in flow.
export const signInFlow = setMe => () => {
  setMe(AUTH_PENDING);
  const popup = openPopup();
  listenForMe(me => {
    popup.close();
    setMe(me);
  });
};
