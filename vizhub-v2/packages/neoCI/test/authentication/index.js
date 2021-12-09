import { signIn } from './signIn';
import { signOut } from './signOut';

export { signIn, signOut };

export const authentication = (my) => () => {
  it('should sign in', signIn(my));
  it('should sign out', signOut(my));
  it('should sign in again', signIn(my));
};
