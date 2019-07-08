import { User } from 'vizhub-entities';

// Creates a User entity from the Express session.
export const userFromSession = session => (
  session.user
    ? new User(Object.assign({ authenticated: true }, session.user))
    : new User({ authenticated: false })
);
