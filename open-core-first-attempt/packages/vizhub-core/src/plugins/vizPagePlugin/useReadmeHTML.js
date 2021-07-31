import { useContext, useState, useEffect } from 'react';
import { isClient } from '../../isomorphic/isClient';
import { getFileText } from '../../entities/VizContent';
import { renderREADME } from './renderREADME';

// Load modules in Node via require().
const loadSecondaryModulesServerSide = () => {
  const marked = require('marked');

  // Invocation of DOMPurify is different on the client vs. server.
  // See https://github.com/cure53/DOMPurify#okay-makes-sense-lets-move-on
  const { JSDOM } = require('jsdom');
  const DOMPurify = require('dompurify')(new JSDOM('').window);

  return { marked, DOMPurify };
};
const secondaryModules = isClient ? null : loadSecondaryModulesServerSide();

const getInitialReadmeHTML = (vizContent) =>
  isClient
    ? // If we're in the client,
      // grab the server-rendered HTML to use for initial hydration,
      // before the Web Worker that renders Markdown client side has loaded.
      document.getElementById('readme').innerHTML
    : // If we're on the server,
      // render Markdown synchronously.
      renderREADME(getFileText(vizContent, 'README.md'), secondaryModules);

// Initialize the Web Worker.
// TODO think about maybe we want to do this at the app level,
// as there will be "plugins".
// TODO rename
let myWorker;
if (isClient) {
  // Inspired by https://github.com/mdn/simple-web-worker/blob/gh-pages/main.js
  myWorker = new Worker('/build/worker.js');
}

export const useReadmeHTML = (vizContent) => {
  const [readmeHTML, setReadmeHTML] = useState(
    getInitialReadmeHTML(vizContent)
  );

  // TODO on client, invoke Web Worker to re-render when vizContent changes.
  // TODO debounce rendering.
  useEffect(() => {
    if (isClient) {
      const readmeMarkdown = getFileText(vizContent, 'README.md');
      myWorker.postMessage({ readmeMarkdown });
      console.log('Message posted to worker');

      myWorker.onmessage = function (e) {
        console.log('Message received from worker');
        console.log(e.data);
      };
    }
  }, [vizContent]);

  return readmeHTML;
};
