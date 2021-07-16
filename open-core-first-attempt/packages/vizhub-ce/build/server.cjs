'use strict';

var http = require('http');
var WebSocket = require('ws');
var express = require('express');
var ShareDB = require('sharedb');
var mongodb = require('mongodb');
var ShareDBMongo = require('sharedb-mongo');
var WebSocketJSONStream = require('@teamwork/websocket-json-stream');
var React = require('react');
var server$1 = require('react-dom/server');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var http__default = /*#__PURE__*/_interopDefaultLegacy(http);
var WebSocket__default = /*#__PURE__*/_interopDefaultLegacy(WebSocket);
var express__default = /*#__PURE__*/_interopDefaultLegacy(express);
var ShareDB__default = /*#__PURE__*/_interopDefaultLegacy(ShareDB);
var mongodb__default = /*#__PURE__*/_interopDefaultLegacy(mongodb);
var ShareDBMongo__default = /*#__PURE__*/_interopDefaultLegacy(ShareDBMongo);
var WebSocketJSONStream__default = /*#__PURE__*/_interopDefaultLegacy(WebSocketJSONStream);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function _optionalChain$1(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
const server = (plugins) => {
  // See:
  // https://share.github.io/sharedb/getting-started
  // https://github.com/share/sharedb-mongo
  const mongoURI =
    process.env.VIZHUB_MONGO_URI || 'mongodb://localhost:27017/vizhub';

  const db = ShareDBMongo__default['default']({
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

      const mongoClient = new mongodb__default['default'].MongoClient(mongoURI, {
        useUnifiedTopology: true,
      });
      const mongoDatabase = await mongoClient.connect();
      clearTimeout(timeout);
      callback(null, mongoDatabase);
    },
  });

  const backend = new ShareDB__default['default']({ db });

  const shareDBConnection = backend.connect();
  const expressApp = express__default['default']();
  const port = 8000;

  expressApp.use(express__default['default'].static('public'));

  for (const plugin of plugins) {
    _optionalChain$1([plugin, 'access', _ => _.extendServer, 'optionalCall', _2 => _2(expressApp, shareDBConnection)]);
  }

  const server = http__default['default'].createServer(expressApp);

  const wss = new WebSocket__default['default'].Server({ server });
  wss.on('connection', (ws) => {
    backend.listen(new WebSocketJSONStream__default['default'](ws));
  });

  server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
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

// Gets a current snapshot of a ShareDB document.
const getShareDBSnapshot = (shareDBConnection, collectionName) => (id) =>
  new Promise((resolve, reject) => {
    // See https://github.com/share/sharedb/blob/master/examples/counter-json1/server.js
    const shareDBDoc = shareDBConnection.get(collectionName, id);
    shareDBDoc.fetch((error) => {
      if (error) {
        return reject(error);
      }
      if (shareDBDoc.type === null) {
        // Not found.
        return resolve(null);
      }
      const { version, data, type } = shareDBDoc;
      const snapshot = { v: version, data, type };
      resolve(snapshot);
    });
  });

// These functions are responsible for safely transporting page data
// from the server, via a string in HTML to the client rendered app.

const encodePageData = (pageData) =>
  btoa(encodeURIComponent(JSON.stringify(pageData)));

const reactVersion = "17.0.2";
const cdn = 'https://cdn.jsdelivr.net/npm';

// TODO get oembed working
// <link rel="alternate" type="application/json+oembed" href="https://vizhub.com/oembed?url=https://vizhub.com/" title="VizHub - data visualization platform"/>

// TODO remove this, implement it for each page
const defaultMeta = {
  url: 'https://vizhub.com',
  title: 'VizHub - data visualization platform',
  description:
    'Learn to code interactive graphics &amp; data visualization with Web technologies!',
  image: 'https://vizhub.com/images/unfurl-logo.png',
  siteName: 'VizHub',

  // See https://ogp.me/#types
  // TODO use "article" for vizzes
  // TODO use "profile" for user profiles
  type: 'website',
};

// TODO i18n, translations
const locale = 'en-US';

const indexHTML = ({
  title,
  rootHTML,
  pageData,

  // TODO tweak meta information per page.
  meta = defaultMeta,
}) => `<!DOCTYPE html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="theme-color" content="#f6eee3">

    <link rel="shortcut icon" href="favicon.ico" />
    <link rel="manifest" href="/manifest.json" crossorigin="use-credentials"/>
    <link href="/build/styles.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width">
    <meta property="og:url" content="${meta.url}"/>
    <meta property="og:title" content="${meta.title}"/>
    <meta property="og:description" content="${meta.description}"/>
    <meta property="og:image" content="${meta.image}"/>
    <meta property="og:site_name" content="${meta.siteName}"/>
    <meta property="og:locale" content="${locale}" />
    <meta property="og:type" content="${meta.type}"/>
    <meta name="twitter:card" content="summary_large_image"/>
  </head>
  <body>
    <div id="root">${rootHTML}</div>
    <script src="${cdn}/react@${reactVersion}/umd/react.production.min.js"></script>
    <script src="${cdn}/react-dom@${reactVersion}/umd/react-dom.production.min.js"></script>
    <script>
      window.pageData = "${encodePageData(pageData)}";
    </script>
    <script src="/build/index.js"></script>
  </body>
</html>`;

const _jsxFileName$1 = "/home/curran/repos/vizhub-core/packages/vizhub-core/src/plugins/vizPagePlugin/VizPage.js";
const VizPage = ({ vizInfo }) => React__default['default'].createElement('div', {__self: undefined, __source: {fileName: _jsxFileName$1, lineNumber: 3}}, vizInfo.title);

const _jsxFileName = "/home/curran/repos/vizhub-core/packages/vizhub-core/src/plugins/vizPagePlugin/server.js"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
const vizPageServerPlugin = () => ({
  extendServer: (expressApp, shareDBConnection) => {
    const getVizInfoSnapshot = getShareDBSnapshot(
      shareDBConnection,
      'documentInfo'
    );

    expressApp.get('/:userName/:vizId', async (req, res) => {
      const { vizId } = req.params;

      try {
        const vizInfoSnapshot = await getVizInfoSnapshot(vizId);
        if (vizInfoSnapshot === null) {
          return res.send('TODO 404 not found page. need to log in?');
        }

        const vizInfo = VizInfo(vizInfoSnapshot.data);
        const { title } = vizInfo;

        // TODO SSR React-Router
        // TODO leverage ingestSnapshot in frontend.

        const rootHTML = server$1.renderToString(React__default['default'].createElement(VizPage, { vizInfo: vizInfo, __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 30}} ));
        const pageData = { vizInfoSnapshot };

        res.type('html');
        res.send(indexHTML({ title, rootHTML, pageData }));
      } catch (error) {
        // Should never happen, but if it does, surface the error clearly.
        console.log(error);
        res.send(_optionalChain([error, 'access', _ => _.toString, 'optionalCall', _2 => _2()]));
      }
    });
  },
});

const plugins = [vizPageServerPlugin()];

server(plugins);
//# sourceMappingURL=server.cjs.map
