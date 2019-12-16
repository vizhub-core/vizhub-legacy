import { setupPrivateViz } from './setupPrivateViz';
import { switchToPrivate } from './switchToPrivate';

export const privacy = my => () => {
  before(setupPrivateViz(my));

  it('should switch from public to private', switchToPrivate(my));
};
