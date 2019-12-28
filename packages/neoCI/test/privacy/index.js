import { signOut, signIn } from '../authentication';
import { goToHomeState } from './goToHomeState';
import { setupPrivateViz } from './setupPrivateViz';
import { switchPrivacy } from './switchPrivacy';
import { vizNotFound } from './vizNotFound';
import { vizFound } from './vizFound';
import { excludePrivateFromHomePage } from './excludePrivateFromHomePage';
import { excludePrivateFromProfilePage } from './excludePrivateFromProfilePage';
import { includePrivateOnProfilePage } from './includePrivateOnProfilePage';
import { shareDBBlockReads } from './shareDBBlockReads';

export const privacy = my => () => {
  before(setupPrivateViz(my));

  //d3.cross(['public','private'], ['owner', 'non-owner', 'collaborator','anonymous']).forEach(x => console.log(x.join('\t')))
  //
  //  1. public   owner          yes
  //  2. public   non-owner      yes
  //  3. public   collaborator   yes
  //  4. public   anonymous      yes   ✓
  //  5. private  owner          yes   ✓
  //  6. private  non-owner      no
  //  7. private  collaborator   yes
  //  8. private  anonymous      no    ✓
  //
  describe('Viz Page', () => {
    it('should return to home state', goToHomeState(my));

    // 4.
    it('should display public viz if not authenticated', vizFound(my));

    it('should sign in', signIn(my));
    it(
      'should switch from public to private',
      switchPrivacy(my, 'public', 'private')
    );

    // 5.
    it('should display private viz if authenticated as owner', vizFound(my));

    it('should sign out', signOut(my));

    // 8.
    it('should display viz not found if not authenticated', vizNotFound(my));
  });

  describe('Home Page', () => {
    it('should return to home state', goToHomeState(my));
    it(
      'should exclude private viz from home page',
      excludePrivateFromHomePage(my)
    );
  });

  describe('Profile Page', () => {
    it('should return to home state', goToHomeState(my));
    it(
      'should exclude private viz from profile page',
      excludePrivateFromProfilePage(my)
    );
    it('should sign in', signIn(my));
    it(
      'should include private viz in profile page if owner is authenticated',
      includePrivateOnProfilePage(my)
    );
  });

  //describe('ShareDB Middleware Access Control', () => {
  //  it('should block reads for private visualizations', shareDBBlockReads(my));
  //});

  //it('should sign in', signIn(my));
  //it('should switch private to public', switchPrivacy(my, 'public'));
};
