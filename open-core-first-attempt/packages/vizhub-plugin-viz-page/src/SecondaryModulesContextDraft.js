// This was a working thing at some point.
// The pattern is good.
// If we ever need to dynamically load modules, e.g. CodeMirror,
// let's bring this back.

//import React, { createContext, useEffect, useState } from 'react';
//import { isClient } from '../../isomorphic/isClient';
//import { jsDelivrCombine } from '../../isomorphic/jsDelivrCombine';
//
//// TODO magicsandbox, rollup
//// We use Rollup to bundle ES modules in the browser.
////const rollupVersion = '2.55.1';
////  `rollup@${rollupVersion}/dist/rollup.browser.js`,
//
//// We use Marked to render Markdown.
//// https://www.npmjs.com/package/marked
//const markedVersion = '2.1.3';
//
//// We use DOMPurify to sanitize rendered Markdown.
//// https://www.npmjs.com/package/dompurify
//const domPurifyVersion = '2.3.0';
//
//// Load modules in the browser via CDN.
//const loadSecondaryModulesClientSide = (callback) => {
//  const libraries = jsDelivrCombine([
//    `marked@${markedVersion}/marked.min.js`,
//    `dompurify@${domPurifyVersion}/dist/purify.min.js`,
//  ]);
//
//  const script = document.createElement('script');
//  script.onload = () => {
//    callback({ marked, DOMPurify });
//  };
//  script.setAttribute('src', libraries);
//
//  document.body.appendChild(script);
//};
//
//export const SecondaryModulesContext = createContext();
//
//// Load modules in Node via require().
//const loadSecondaryModulesServerSide = () => {
//  const marked = require('marked');
//
//  // Invocation of DOMPurify is different on the client vs. server.
//  // See https://github.com/cure53/DOMPurify#okay-makes-sense-lets-move-on
//  const { JSDOM } = require('jsdom');
//  const DOMPurify = require('dompurify')(new JSDOM('').window);
//
//  return { marked, DOMPurify };
//};
//
//export const SecondaryModulesContextProvider = ({ children }) => {
//  const [secondaryModules, setSecondaryModules] = useState(
//    isClient ? null : loadSecondaryModulesServerSide()
//  );
//
//  useEffect(() => {
//    if (isClient) {
//      loadSecondaryModulesClientSide(setSecondaryModules);
//    }
//  }, []);
//
//  return (
//    <SecondaryModulesContext.Provider value={secondaryModules}>
//      {children}
//    </SecondaryModulesContext.Provider>
//  );
//};
