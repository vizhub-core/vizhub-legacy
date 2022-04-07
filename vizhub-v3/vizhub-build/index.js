// Inspired by:
// https://github.com/curran/sharedb-racer-react-demo/blob/main/src/server.js
// https://github.com/vizhub-core/vizhub/blob/main/prototypes/open-core-first-attempt/packages/vizhub-core/src/server/index.js

export const external = [
  '@teamwork/websocket-json-stream',
  'assert',
  'diff-match-patch',
  'express',
  'express-session',
  'http',
  'jsesc',
  'json0-ot-diff',
  'mocha',
  'ot-json1',
  'ot-text-unicode',
  'passport',
  'passport-google-oidc',
  'react',
  'react-bootstrap',
  'react-bootstrap/SSRProvider',
  'react-dom',
  'react-dom/server',
  'sharedb',
  'sharedb-client-browser',
  'sharedb-mingo-memory',
  'sharedb/lib/client',
  'uuid',
  'ws',
];

//console.log(external.sort());

export const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'sharedb/lib/client': 'ShareDBClient',
  'react-bootstrap': 'ReactBootstrap',
  //'vizhub-ui': 'VizHubUI',
  'ot-json1': 'ShareDBClient.json1',
  'ot-text-unicode': 'ShareDBClient.textUnicode',
};
