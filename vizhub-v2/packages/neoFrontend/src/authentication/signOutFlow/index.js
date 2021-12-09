import { AUTH_PENDING } from '../constants';
import { fetchSignOut } from './fetchSignOut';

export const signOutFlow = (setMe) => () => {
  setMe(AUTH_PENDING);
  fetchSignOut().then(({ ok }) => {
    if (ok) {
      setMe(null);
    } else {
      throw new Error(
        'Something went wrong with signing out. Server is down perhaps?'
      );
    }
  });
};
