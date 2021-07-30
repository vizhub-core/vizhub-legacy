import { stringifyPageDataTest } from './isomorphic/stringifyPageDataTest';
import { vizInfoTest } from './entities/VizInfoTest';
import { vizContentTest } from './entities/VizContentTest';
//import { renderPageTest } from './server/renderPage/renderPageTest';
//import { databaseTest } from './server/database/databaseTest';
//import { getHomePageDataTest } from './interactors/getHomePageDataTest';
//import { homePagePresenterTest } from './presenters/homePagePresenterTest';
//import { vizPagePresenterTest } from './plugins/vizPage/vizPagePresenterTest';
export const coreTests = () => {
  stringifyPageDataTest();
  vizInfoTest();
  vizContentTest();
  // renderPageTest();
  // databaseTest();
  // getHomePageDataTest();
  // homePagePresenterTest();
  // vizPagePresenterTest();
};
