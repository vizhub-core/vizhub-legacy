import { openPopup } from './openPopup';
import { listenForCode } from './listenForCode';

// Implements a popup-based OAuth sign in flow.
export const signIn = () => {
  const popup = openPopup();
  const onCodeReceived = code => {
    popup.close();
    console.log('invoke API with ' + code);
  };
  listenForCode(onCodeReceived);
};
