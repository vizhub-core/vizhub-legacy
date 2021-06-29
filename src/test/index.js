import { vizInfoTest } from '../entities/vizInfoTest';
import { pageDataTest } from '../pageDataTest';
import { renderPageTest } from '../server/renderPageTest';
import { databaseTest } from '../server/databaseTest';

// TODO add test for database interface, check that exposed methods equal expected methods
// TODO document that the "gateway interface" API must match across database implementations
// TODO introduce ShareDB database interface

vizInfoTest();
pageDataTest();
renderPageTest();
databaseTest();
