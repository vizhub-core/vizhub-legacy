const files = [
{ name: 'index.html', text:
`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Untitled</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    Hello
    <script src="bundle.js"></script>
  </body>
</html>`},

{ name: 'styles.css', text:
`body {
  background-color: red;
  margin 0px;
  font-size: 5em;
}`},

{ name: 'index.js', text:
`import { foo } from './foo';
console.log(foo);`},

{ name: 'foo.js', text:
`export const foo = "Hello World!"`}
];

export const visualizationDefaults = {
  title: 'Untitled',
  slug: undefined,
  description: 'No description',
  files
};
