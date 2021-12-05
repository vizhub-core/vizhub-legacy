import assert from 'assert';
import { excludePrivateFromPage } from './excludePrivateFromPage';

export const excludePrivateFromProfilePage = (my) =>
  excludePrivateFromPage(my, {
    url: 'http://localhost:3000/ci',
    parentSelector: '.test-profile-page-viz-previews',
  });
