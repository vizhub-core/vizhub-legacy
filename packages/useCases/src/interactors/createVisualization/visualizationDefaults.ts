const defaultIndexHTML =
`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Untitled</title>
  </head>
  <body>
    Hello
  </body>
</html>`;

const defaultStylesCSS =
`body {
  background-color: red;
  margin 0px;
  font-size: 5em;
}`;

export const visualizationDefaults = {
  title: 'Untitled',
  slug: undefined,
  description: 'No description',
  files: [
    { name: 'index.html', text: defaultIndexHTML },
    { name: 'styles.css', text: defaultStylesCSS }
  ]
};
