const reactVersion = '17.0.2';

export const indexHTML = (title, rootHTML) => `<html>
  <head>
    <title>${title}</title>
    <srcipt src="https://unpkg.com/react@${reactVersion}/umd/react.production.min.js"></script>
    <srcipt src="https://unpkg.com/react-dom@${reactVersion}/umd/react-dom.production.min.js"></script>
  </head>
  <body>
    <div id="root">${rootHTML}</div>
  </body>
</html>`;
