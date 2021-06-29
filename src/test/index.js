import { vizInfoTest } from '../entities/vizInfoTest';
import { pageDataTest } from '../pageDataTest';
import { renderPageTest } from '../server/renderPageTest';
import { databaseTest } from '../server/databaseTest';
import { getHomePageDataTest } from '../interactors/getHomePageDataTest';
import { homePagePresenterTest } from '../presenters/homePagePresenterTest';

// TODO move this to src/test.js

// TODO document that the "gateway interface" API must match across database implementations
// TODO introduce ShareDB database interface

vizInfoTest();
pageDataTest();
renderPageTest();
databaseTest();
getHomePageDataTest();
homePagePresenterTest();
