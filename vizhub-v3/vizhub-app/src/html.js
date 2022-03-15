import jsesc from 'jsesc';
import pkg from '../package.json';

//const cdn = 'https://unpkg.com';
const cdn = 'https://cdn.jsdelivr.net/npm';

// Derive the version of a given package from package.json.
const v = (packageName) => pkg.dependencies[packageName].replace('^', '');

// The ShareDB client is responsible for real time synchronization.

// Computes a JSDelivr CDN URL that will fetch multiple JS libraries
// concatenated together (they all introduce globals).
const jsDelivrCombine = (libs) =>
  'https://cdn.jsdelivr.net/combine/' +
  libs.map((lib) => `npm/${lib}`).join(',');

// Underlying Philosophy: Pull in large dependencies via CDN when possible.
// Why? Minimize data transfer from our servers, less costly operations.
const libraries = jsDelivrCombine([
  `react@${v('react')}/umd/react.production.min.js`,
  `react-dom@${v('react')}/umd/react-dom.production.min.js`,

  // See https://github.com/vizhub-core/sharedb-client-browser
  `sharedb-client-browser@${v(
    'sharedb-client-browser'
  )}/sharedb-client-json1-browser.min.js`,

  // See https://github.com/react-bootstrap/react-bootstrap
  `react-bootstrap@${v('react-bootstrap')}/dist/react-bootstrap.min.js`,
]);

// See https://github.com/vizhub-core/vizhub/tree/main/vizhub-v3/vizhub-ui
const link = (href) => `<link rel="stylesheet" href="${href}">`;

const uiCSS = link(`${cdn}/vizhub-ui@${v('vizhub-ui')}/dist/vizhub-ui.min.css`);
const appCSS = link(`/vizhub-app.css`);

// A way to disable client side JS, for testing during development.
const enableClientJS = true;

// Renders the HTML served to the browser.
export const html = ({ title, rootHTML, pageData }) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    ${uiCSS}
    ${appCSS}
  </head>
  <body>
    <div id="vizhub-root">${rootHTML}</div>
    <script src="${libraries}"></script>
    <script>window.pageData = ${jsesc(pageData)};</script>
    ${enableClientJS ? '<script src="/client.js"></script>' : ''}
  </body>
</html>`;
