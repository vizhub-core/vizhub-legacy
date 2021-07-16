import React from 'react';
import { vizPageClientPlugin, decodePageData, App } from 'vizhub-core/client';
console.log('I am the client');
const plugins = [vizPageClientPlugin()];

console.log(decodePageData(window.pageData));
console.log(React);

//import('./client2.js').then(({ message }) => {
//  console.log(message);
//});
