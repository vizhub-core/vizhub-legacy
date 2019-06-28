import { openPopup } from './openPopup';
import { listenForMe } from './listenForMe';

// TODO make this its own dir.

// Implements a popup-based OAuth sign in flow.
export const signIn = setMe => () => {
  const popup = openPopup();
  listenForMe(me => {
    popup.close();
    setMe(me);
  });
};
