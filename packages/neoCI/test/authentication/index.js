import { navigateToAuthPage } from './navigateToAuthPage';
import { signIn } from './signIn';
import { signOut } from './signOut';

export { signOut };

export const authentication = my => () => {
  it('should navigate to auth page', navigateToAuthPage(my));
  it('should authenticate as CI', signIn(my));
  it('should sign out', signOut(my));
  it('should navigate to auth page a second time', navigateToAuthPage(my));
  it('should authenticate as CI a second time', signIn(my));
};
