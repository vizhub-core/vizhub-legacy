import { signOut, signIn } from '../authentication';
import { goToHomeState } from './goToHomeState';
import { setupPrivateViz } from './setupPrivateViz';
import { switchPrivacy } from './switchPrivacy';
import { vizNotFound } from './vizNotFound';
import { vizFound } from './vizFound';
import { excludePrivateFromHomePage } from './excludePrivateFromHomePage';
import { shareDBBlockReads } from './shareDBBlockReads';

export const privacy = my => () => {
  before(setupPrivateViz(my));

  describe('Direct Access to Private Viz', () => {
    it('should return to home state', goToHomeState(my));
    it('should display public viz if not authenticated', vizFound(my));

    it('should sign in', signIn(my));
    it(
      'should switch from public to private',
      switchPrivacy(my, 'public', 'private')
    );

    it('should sign out', signOut(my));
    it('should display viz not found if not authenticated', vizNotFound(my));

    //it('should return to home state', goToHomeState(my));
    //it('should sign in', signIn(my));
    //it('should display viz if authenticated', vizFound(my));
  });

  //describe('ShareDB Middleware Access Control', () => {
  //  it('should block reads for private visualizations', shareDBBlockReads(my));
  //});

  //describe('Block Indirect Access to Private Viz', () => {
  //  it(
  //    'should exclude private viz from home page',
  //    excludePrivateFromHomePage(my)
  //  );
  //  //it(
  //  //  'should switch from public to private',
  //  //  switchPrivacy(my, 'public', 'private')
  //  //);
  //  //it('should sign out', signOut(my));
  //  //it('should display viz not found if not authenticated', vizNotFound(my));
  //});

  //it('should sign in', signIn(my));
  //it('should switch private to public', switchPrivacy(my, 'public'));
};
