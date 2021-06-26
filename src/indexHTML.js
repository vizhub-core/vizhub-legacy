import pkg from '../package.json';
import { encodePageData } from './pageData';

// Derive the CDN package versions from package.json.
const {
  dependencies: { react },
} = pkg;

// This is only used in the browser, version is defined here only.
const d3Require = '1.2.4';

export const indexHTML = ({ title, rootHTML, page, pageProps }) => `<html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width">
    <link href="/styles.css" rel="stylesheet">
  </head>
  <body>
    <div id="root">${rootHTML}</div>
    <script src="https://unpkg.com/react@${react}/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@${react}/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/d3-require@${d3Require}/dist/d3-require.min.js"></script>
    <script>
      window.pageData = "${encodePageData({ page, pageProps })}";
    </script>
    <script src="/build/client.js"></script>
  </body>
</html>`;
