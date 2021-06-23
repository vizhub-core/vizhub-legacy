const reactVersion = '17.0.2';

export const indexHTML = (title, rootHTML) => `<html>
  <head>
    <title>${title}</title>
    <script src="https://unpkg.com/react@${reactVersion}/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@${reactVersion}/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/d3-require@1.2.4/dist/d3-require.min.js"></script>
  </head>
  <body>
    <div id="root">${rootHTML}</div>
    <script src="build/client.js"></script>
  </body>
</html>`;
