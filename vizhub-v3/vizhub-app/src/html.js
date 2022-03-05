import jsesc from 'jsesc';
import pkg from '../package.json';

//const cdn = 'https://unpkg.com';
const cdn = 'https://cdn.jsdelivr.net/npm';

// Use the same React version on the client and the server.
const reactVersion = pkg.dependencies.react.replace('^', '');

// The ShareDB client is responsible for real time synchronization.
// See https://github.com/vizhub-core/sharedb-client-browser
const shareDBClientVersion = pkg.dependencies['sharedb-client-browser'].replace(
  '^',
  ''
);

// TODO pull in vizhub-ui
//https://unpkg.com/vizhub-ui@0.0.4/dist/vizhub-ui.min.css

// Computes a JSDelivr CDN URL that will fetch multiple JS libraries
// concatenated together (they all introduce globals).
const jsDelivrCombine = (libs) =>
  'https://cdn.jsdelivr.net/combine/' +
  libs.map((lib) => `npm/${lib}`).join(',');

// Underlying Philosophy: Pull in large dependencies via CDN when possible.
// Why? Minimize data transfer from our servers, less costly operations.
const libraries = jsDelivrCombine([
  `react@${reactVersion}/umd/react.production.min.js`,
  `react-dom@${reactVersion}/umd/react-dom.production.min.js`,
  `sharedb-client-browser@${shareDBClientVersion}/sharedb-client-json1-browser.min.js`,
]);

// Renders the HTML served to the browser.
export const html = ({ title, rootHTML, pageData }) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
  </head>
  <body>
    <div id="root">${rootHTML}</div>
    <script src="${libraries}"></script>
    <script>window.pageData = ${jsesc(pageData)};</script>
    <script src="client.js"></script>
  </body>
</html>`;
