import assert from 'assert';
import { getVizIdList } from './getVizIdList';
import { excludePrivateFromPage } from './excludePrivateFromPage';

export const excludePrivateFromHomePage = my =>
  excludePrivateFromPage(my, {
    url: 'http://localhost:3000/',
    parentSelector: '.test-home-page-viz-previews'
  });
