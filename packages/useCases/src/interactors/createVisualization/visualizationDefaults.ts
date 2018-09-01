const files = [

{ name: 'index.html', text:
`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Untitled</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://unpkg.com/d3@5.5.0/dist/d3.min.js"></script>
  </head>
  <body>
    <div id="message"></div>
    <script src="bundle.js"></script>
  </body>
</html>`},

{ name: 'styles.css', text:
`body {
  background-color: red;
  margin 0px;
  font-size: 8em;
}`},

{ name: 'index.js', text:
`import { select } from 'd3';
import { message } from './message';
select('#message').text(message);`},

{ name: 'message.js', text:
`export const message = "D3 and ES6 imports are working !"`},

{ name: 'README.md', text:
`This is a cool [dataviz](https://twitter.com/search?q=%23dataviz)!`},
];

export const visualizationDefaults = {
  title: 'Untitled',
  slug: undefined,
  description: 'No description',
  files,
  forkedFrom: undefined
};
