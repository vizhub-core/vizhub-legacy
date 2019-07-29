import { navigateToAuthPage } from './navigateToAuthPage';
import { authAsCI } from './authAsCI';
import { signOut } from './signOut';

export const authentication = my => () => {
  it('should navigate to auth page', navigateToAuthPage(my));
  it('should authenticate as CI', authAsCI(my));
  it('should sign out', signOut(my));
  it('should navigate to auth page a second time', navigateToAuthPage(my));
  it('should authenticate as CI a second time', authAsCI(my));
};
