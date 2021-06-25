import pkg from '../package.json';

const {
  dependencies: { react },
} = pkg;

// This is only used in the browser, version is defined here only.
const d3Require = '1.2.4';

export const indexHTML = ({ title, rootHTML, page, pageProps }) => `<html>
  <head>
    <title>${title}</title>
    <link href="/styles.css" rel="stylesheet">
  </head>
  <body>
    <div id="root">${rootHTML}</div>
    <script src="https://unpkg.com/react@${react}/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@${react}/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/d3-require@${d3Require}/dist/d3-require.min.js"></script>
    <script>
      window.pageData = "${btoa(JSON.stringify({ page, pageProps }))}";
    </script>
    <script src="/build/client.js"></script>
  </body>
</html>`;
