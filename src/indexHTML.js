// TODO source these from package.json.
const reactVersion = '17.0.2';
const d3RequireVersion = '1.2.4';

export const indexHTML = ({ title, rootHTML, page, pageProps }) => `<html>
  <head>
    <title>${title}</title>
    <script src="https://unpkg.com/react@${reactVersion}/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@${reactVersion}/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/d3-require@${d3RequireVersion}/dist/d3-require.min.js"></script>
  </head>
  <body>
    <div id="root">${rootHTML}</div>
    <script>
      window.page = "${page}";
      window.pageProps = ${JSON.stringify(pageProps)}
    </script>
    <script src="/build/client.js"></script>
  </body>
</html>`;
