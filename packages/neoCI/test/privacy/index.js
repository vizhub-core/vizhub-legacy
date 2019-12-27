import { signOut } from '../authentication';
import { setupPrivateViz } from './setupPrivateViz';
import { switchPrivacy } from './switchPrivacy';
import { vizNotFound } from './vizNotFound';

export const privacy = my => () => {
  before(setupPrivateViz(my));

  it(
    'should switch from public to private',
    switchPrivacy(my, 'public', 'private')
  );
  it('should sign out', signOut(my));
  it('should display viz not found if not authenticated', vizNotFound(my));

  //it('should sign in', signIn(my));
  //it('should switch private to public', switchPrivacy(my, 'public'));
};
