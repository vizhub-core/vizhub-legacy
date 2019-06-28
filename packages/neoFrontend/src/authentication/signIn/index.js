import { openPopup } from './openPopup';
import { listenForMe } from './listenForMe';

// Implements a popup-based OAuth sign in flow.
export const signIn = setMe => () => {
  const popup = openPopup();
  listenForMe(me => {
    popup.close();
    setMe(me);
  });
};
