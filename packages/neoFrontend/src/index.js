import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import prettier from 'prettier/standalone';
import parserHTML from 'prettier/parser-html';
const plugins = [parserHTML];

// Example from https://prettier.io/playground/
const unformattedHTML = `<!DOCTYPE html>
<HTML CLASS="no-js mY-ClAsS">
  <HEAD>
    <META CHARSET="utf-8">
    <TITLE>My tITlE</TITLE>
    <META NAME="description" content="My CoNtEnT">
  </HEAD>
  <body>
    <P>Hello world!<BR> This is HTML5 Boilerplate.</P>
    <SCRIPT>
      window.ga = function () { ga.q.push(arguments) }; ga.q = []; ga.l = +new Date;
      ga('create', 'UA-XXXXX-Y', 'auto'); ga('send', 'pageview')
    </SCRIPT>
    <SCRIPT src="https://www.google-analytics.com/analytics.js" ASYNC DEFER></SCRIPT>
  </body>
</HTML>`;

const formattedHTML = prettier.format(unformattedHTML, {
  parser: 'html',
  plugins
});

console.log(formattedHTML);


// A place to put feature previews and easter eggs.
window.vizhub = {};

// Wait for prefetched fonts.
window.onload = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};
