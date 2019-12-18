import { setupPrivateViz } from './setupPrivateViz';
import { switchToPrivate } from './switchToPrivate';
import { signOut } from '../authentication';

export const privacy = my => () => {
  before(setupPrivateViz(my));

  it('should switch from public to private', switchToPrivate(my));
  it('should sign out', signOut(my));

};
