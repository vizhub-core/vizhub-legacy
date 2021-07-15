import { pageDataTest } from './pageDataTest';
import { vizInfoTest } from './entities/VizInfoTest';
//import { renderPageTest } from './server/renderPage/renderPageTest';
//import { databaseTest } from './server/database/databaseTest';
//import { getHomePageDataTest } from './interactors/getHomePageDataTest';
//import { homePagePresenterTest } from './presenters/homePagePresenterTest';
//import { vizPagePresenterTest } from './presenters/vizPagePresenterTest';
export const coreTests = () => {
  pageDataTest();
  vizInfoTest();
  // renderPageTest();
  // databaseTest();
  // getHomePageDataTest();
  // homePagePresenterTest();
  // vizPagePresenterTest();
};
