import { signOut } from '../authentication';
import { setupPrivateViz } from './setupPrivateViz';
import { switchToPrivate } from './switchToPrivate';
import { vizNotFound } from './vizNotFound';

export const privacy = my => () => {
  before(setupPrivateViz(my));

  it('should switch from public to private', switchToPrivate(my));
  it('should sign out', signOut(my));
  it('should display viz not found if not authenticated', vizNotFound(my));

};
