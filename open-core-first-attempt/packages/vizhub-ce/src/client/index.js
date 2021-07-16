import React from 'react';
import ReactDOM from 'react-dom';
import { vizPageClientPlugin, decodePageData, App } from 'vizhub-core/client';

console.log('I am the client');
const plugins = [vizPageClientPlugin()];

const pageData = decodePageData(window.pageData);

ReactDOM.hydrate(<App />, document.getElementById('root'));
console.log('hydrated');

//import('./client2.js').then(({ message }) => {
//  console.log(message);
//});
