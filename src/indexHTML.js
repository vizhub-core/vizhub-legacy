import pkg from '../package.json';
import { encodePageData } from './pageData';

// Stopped using UNPKG due to this issue: https://github.com/mjackson/unpkg/issues/302
//const cdn = 'https://unpkg.com';

const cdn = 'https://cdn.jsdelivr.net/npm';

// Derive the CDN package versions from package.json.
const {
  dependencies: { react },
} = pkg;

// This is only used in the browser, version is defined here only.
const d3Require = '1.2.4';

// TODO favicon
export const indexHTML = ({ title, rootHTML, page, pageProps }) => `<html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <link rel="shortcut icon" href="favicon.ico" />
    <link rel="manifest" href="manifest.json" crossorigin="use-credentials"/>
    <meta name="viewport" content="width=device-width">
    <link href="/styles.css" rel="stylesheet">
  </head>
  <body>
    <div id="root">${rootHTML}</div>
    <script src="${cdn}/react@${react}/umd/react.production.min.js"></script>
    <script src="${cdn}/react-dom@${react}/umd/react-dom.production.min.js"></script>
    <script src="${cdn}/d3-require@${d3Require}/dist/d3-require.min.js"></script>
    <script>
      window.pageData = "${encodePageData({ page, pageProps })}";
    </script>
    <script src="/client.js"></script>
  </body>
</html>`;
