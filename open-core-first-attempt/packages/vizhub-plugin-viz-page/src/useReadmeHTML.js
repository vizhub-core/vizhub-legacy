import { useContext, useState, useEffect, useRef } from 'react';
import { isClient, getFileText } from 'vizhub-core';
import { renderREADME } from './renderREADME';

// Load modules in Node via require().
const loadNodeModules = () => ({
  marked: require('marked'),
  filterXSS: require('xss'),
});
const { marked, filterXSS } = isClient ? {} : loadNodeModules();

const getInitialReadmeHTML = (vizContent) =>
  isClient
    ? // If we're in the client,
      // grab the server-rendered HTML to use for initial hydration,
      // before the Web Worker that renders Markdown client side has loaded.
      document.getElementById('readme').innerHTML
    : // If we're on the server,
      // render Markdown synchronously.
      renderREADME(getFileText(vizContent, 'README.md'), marked, filterXSS);

// Initialize the Web Worker.
// TODO think about how to organize the build
// such that plugins can add entry points, e.g. worker script.
// Ideally we could use multiple Web Workers to utilize more CPU cores.
// Use case: render Markdown in one thread and simultaneously
// bundle JavaScript in another thread and simultaneously
// run Prettier in another thread.

// Inspired by https://github.com/mdn/simple-web-worker/blob/gh-pages/main.js
const worker = isClient ? new Worker('/build/worker.js') : null;

// The delay used to debounce Markdown rendering (in milliseconds).
// This prevents re-rendering Markdown on each keystroke when editing.
// The Markdown is rendered 500ms after you stop editing the text.
const readmeRenderDebounce = 500;

export const useReadmeHTML = (vizContent) => {
  const [readmeHTML, setReadmeHTML] = useState(
    getInitialReadmeHTML(vizContent)
  );

  // Receive rendered Markdown.
  useEffect(() => {
    worker.onmessage = ({ data }) => {
      setReadmeHTML(data);
    };
  }, [vizContent]);

  // Send Markdown for rendering.
  const timeoutRef = useRef();
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      worker.postMessage(getFileText(vizContent, 'README.md'));
    }, readmeRenderDebounce);
  }, [vizContent]);

  return readmeHTML;
};
