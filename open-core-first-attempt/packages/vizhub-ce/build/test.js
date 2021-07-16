import 'http';
import 'ws';
import 'express';
import ShareDB from 'sharedb';
import mongodb from 'mongodb';
import ShareDBMongo from 'sharedb-mongo';
import '@teamwork/websocket-json-stream';
import 'react';
import 'react-dom/server';
import assert from 'assert';

// See:
// https://share.github.io/sharedb/getting-started
// https://github.com/share/sharedb-mongo

const mongoURI =
  process.env.VIZHUB_MONGO_URI || 'mongodb://localhost:27017/vizhub';

const db = ShareDBMongo({
  mongo: async (callback) => {
    const timeout = setTimeout(() => {
      console.log('\nHaving trouble connecting to the database...');
      console.log('Ensure that the database is running.');
      console.log(
        `VIZHUB_MONGO_URI environment variable is "${process.env.VIZHUB_MONGO_URI}"`
      );
      console.log(`Using Mongo URI "${mongoURI}".`);
      console.log('See README for setup details.');
      console.log('In dev on Linux, start MongoDB with:');
      console.log('\nsudo service mongod start\n');
    }, 4000);

    const mongoClient = new mongodb.MongoClient(mongoURI, {
      useUnifiedTopology: true,
    });
    const mongoDatabase = await mongoClient.connect();
    clearTimeout(timeout);
    callback(null, mongoDatabase);
  },
});

const backend = new ShareDB({ db });

backend.connect();

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
      assert.deepEqual(decodePageData(encodePageData(pageData)), pageData);
    });
  });
};

//import { vizInfoTest } from './entities/vizInfoTest';
//import { renderPageTest } from './server/renderPage/renderPageTest';
//import { databaseTest } from './server/database/databaseTest';
//import { getHomePageDataTest } from './interactors/getHomePageDataTest';
//import { homePagePresenterTest } from './presenters/homePagePresenterTest';
//import { vizPagePresenterTest } from './presenters/vizPagePresenterTest';
const coreTests = () => {
  // vizInfoTest();
  pageDataTest();
  // renderPageTest();
  // databaseTest();
  // getHomePageDataTest();
  // homePagePresenterTest();
  // vizPagePresenterTest();
};

coreTests();
