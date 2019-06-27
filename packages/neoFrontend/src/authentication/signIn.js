import { openPopup } from './openPopup';
import { listenForAuthenticatedUser } from './listenForAuthenticatedUser';

// Implements a popup-based OAuth sign in flow.
export const signIn = () => {
  const popup = openPopup();
  const onAuthenticatedUserReceived = authenticatedUser => {
    popup.close();
    console.log('authenticatedUser');
    console.log(authenticatedUser);
    // TODO use this in auth context
  };
  listenForAuthenticatedUser(onAuthenticatedUserReceived);
};
