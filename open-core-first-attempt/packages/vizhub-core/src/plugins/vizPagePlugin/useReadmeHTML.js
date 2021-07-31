import { useContext } from 'react';
import { isClient } from '../../isomorphic/isClient';
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

// Grab server-rendered HTML to use for initial hydration,
// before the Web Worker that renders client side has loaded.
const serverRenderedReadmeHTML = isClient
  ? document.getElementById('readme').innerHTML
  : null;

export const useReadmeHTML = (vizContent) => {
  const secondaryModules = isClient ? null : loadSecondaryModulesServerSide();
  return secondaryModules
    ? renderREADME(vizContent, secondaryModules)
    : serverRenderedReadmeHTML;
};
