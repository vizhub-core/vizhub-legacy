import { vizInfoTest } from './entities/vizInfoTest';
import { pageDataTest } from './pageDataTest';
import { renderPageTest } from './server/renderPage/renderPageTest';
import { databaseTest } from './server/database/databaseTest';
import { getHomePageDataTest } from './interactors/getHomePageDataTest';
import { homePagePresenterTest } from './presenters/homePagePresenterTest';
import { vizPagePresenterTest } from './presenters/vizPagePresenterTest';

// TODO document that the "gateway interface" API must match across database implementations
// TODO introduce ShareDB database interface

vizInfoTest();
pageDataTest();
renderPageTest();
databaseTest();
getHomePageDataTest();
homePagePresenterTest();
vizPagePresenterTest();
