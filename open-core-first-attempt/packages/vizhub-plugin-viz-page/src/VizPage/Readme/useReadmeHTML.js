import { useContext, useState, useEffect, useRef } from 'react';
import { isClient, getFileText } from 'vizhub-core/worker';
import { VizContext } from '../VizContext';
import { renderREADME } from './renderREADME';

// Load modules in Node via require().
const loadNodeModules = () => ({
  marked: require('marked'),
  filterXSS: require('xss'),
});
const { marked, filterXSS } = isClient ? {} : loadNodeModules();

// Parse the innerHTML _only once_ on module load,
// not every time getInitialReadmeHTML is called.
// TODO ensure this only runs in the Viz page, not other pages.
const serverRenderedMarkdown = isClient
  ? document.getElementById('readme').innerHTML
  : null;

const getInitialReadmeHTML = (vizContent) =>
  isClient
    ? // If we're in the client,
      // grab the server-rendered HTML to use for initial hydration,
      // before the Web Worker that renders Markdown client side has loaded.
      serverRenderedMarkdown
    : // If we're on the server,
      // render Markdown synchronously.
      renderREADME(getFileText(vizContent, 'README.md'), marked, filterXSS);

// Initialize the Web Worker.

// Inspired by https://github.com/mdn/simple-web-worker/blob/gh-pages/main.js
// TODO only initialize this on the viz page. Test that home page does not load this.
const worker = isClient
  ? new Worker('/build/viz-page/markdownRenderingWorker.js')
  : null;

// The delay used to debounce Markdown rendering (in milliseconds).
// This prevents re-rendering Markdown on each keystroke when editing.
// The Markdown is rendered 500ms after you stop editing the text.
const readmeRenderDebounce = 500;

export const useReadmeHTML = () => {
  const { vizContent } = useContext(VizContext);
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
