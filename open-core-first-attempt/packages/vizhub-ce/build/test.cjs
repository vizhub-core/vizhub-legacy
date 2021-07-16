'use strict';

var assert = require('assert');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var assert__default = /*#__PURE__*/_interopDefaultLegacy(assert);

// These functions are responsible for safely transporting page data
// from the server, via a string in HTML to the client rendered app.

const encodePageData = (pageData) =>
  btoa(encodeURIComponent(JSON.stringify(pageData)));

const decodePageData = (encodedPageData) =>
  JSON.parse(decodeURIComponent(atob(encodedPageData)));

// TODO get this to run

const pageDataTest = () => {
  describe('pageData', () => {
    it('Should encoded and decode data with Unicode characters', () => {
      const pageData = { foo: { bar: 'It’s a beautiful day!' } };
      assert__default['default'].deepEqual(decodePageData(encodePageData(pageData)), pageData);
    });
  });
};

// Creates an instance of an entity.
// Supports instanceof checks (e.g. vizInfo instanceof VizInfo).
//
//  * `constructor.keys` is the list of keys to copy from data.
//    It is an extension point for plugins. Plugins may append to
//    this array at import time to augment entities with more properties.
const createInstance = (constructor, data) => {
  if (!data) return null;
  const instance = new constructor();
  for (const key of constructor.keys) {
    instance[key] = data[key];
  }
  return instance;
};

function VizInfo(data) {
  return createInstance(VizInfo, data);
}

VizInfo.keys = [
  // The unique ID of the document.
  'id',

  // The ID of the user that owns this document.
  'owner',

  // The title of the document.
  'title',

  // The Markdown description of the document.
  'description',

  // The Unix timestamp at which this document was created.
  'createdTimestamp',

  // The Unix timestamp at which this document was last updated.
  'lastUpdatedTimestamp',

  // The visualization that this visualization was forked from.
  'forkedFrom',

  // The number of forks this viz has.
  // Updatable via query across entire database at once.
  // Also updated incrementally as forks are created.
  'forksCount',

  // The height of the viz in pixels.
  'height',
];

const vizInfoTest = () => {
  describe('VizInfo', () => {
    it('should copy expected keys', () => {
      const vizInfo = VizInfo({});
      assert__default['default'].deepEqual(Object.keys(vizInfo), [
        'id',
        'owner',
        'title',
        'description',
        'createdTimestamp',
        'lastUpdatedTimestamp',
        'forkedFrom',
        'forksCount',
        'height',
      ]);
    });

    it('should support instanceof', () => {
      const vizInfo = VizInfo({});
      assert__default['default'](vizInfo instanceof VizInfo);
    });

    it('should pass through null & undefined as null', () => {
      assert__default['default'].equal(VizInfo(null), null);
      assert__default['default'].equal(VizInfo(undefined), null);
    });

    it('should support extension with additional keys', () => {
      VizInfo.keys.push('someFancyNewPropertyDefinedByAPlugin');
      const vizInfo = VizInfo({});
      assert__default['default'].deepEqual(Object.keys(vizInfo), [
        'id',
        'owner',
        'title',
        'description',
        'createdTimestamp',
        'lastUpdatedTimestamp',
        'forkedFrom',
        'forksCount',
        'height',
        'someFancyNewPropertyDefinedByAPlugin',
      ]);
    });
  });
};

//import { renderPageTest } from './server/renderPage/renderPageTest';
//import { databaseTest } from './server/database/databaseTest';
//import { getHomePageDataTest } from './interactors/getHomePageDataTest';
//import { homePagePresenterTest } from './presenters/homePagePresenterTest';
//import { vizPagePresenterTest } from './presenters/vizPagePresenterTest';
const coreTests = () => {
  pageDataTest();
  vizInfoTest();
  // renderPageTest();
  // databaseTest();
  // getHomePageDataTest();
  // homePagePresenterTest();
  // vizPagePresenterTest();
};

coreTests();
