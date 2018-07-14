export const defaultHTML = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Untitled</title>
  </head>
  <body style="background-color: red; margin 0px;">
    <h1>Hello</h1>
  </body>
</html>`;

export const visualizationDefaults = {
  title: 'Untitled',
  slug: undefined,
  description: 'No description',
  files: [
    { name: 'index.html', text: defaultHTML }
  ]
};
