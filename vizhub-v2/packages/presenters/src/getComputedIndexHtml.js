import { getText } from './accessors';
import {
  dependencies,
  getConfiguredLibraries,
  dependencySource,
} from './packageJson';
import { isPackageJSONEnabled } from './featureFlags';

const template = (files) => getText(files, 'index.html');
const bundle = (files) => getText(files, 'bundle.js');

let parser;

// If we're in the browser, use native DOMParser.
if (typeof window !== 'undefined') {
  parser = new DOMParser();
}

// Expose a way to inject a DOMParser implementation
// when we're in a Node environment (tests, API server).
export const setJSDOM = (JSDOM) => {
  parser = new new JSDOM().window.DOMParser();
};

const injectBundleScript = (htmlTemplate, files) => {
  const doc = parser.parseFromString(htmlTemplate, 'text/html');

  if (bundle(files) && !doc.querySelector('[src="bundle.js"]')) {
    const bundleScriptTag = doc.createElement('script');
    bundleScriptTag.src = 'bundle.js';
    doc.body.appendChild(bundleScriptTag);
    return `<!DOCTYPE html>${doc.documentElement.outerHTML}`;
  } else {
    return htmlTemplate;
  }
};

const injectDependenciesScript = (htmlTemplate, files) => {
  const deps = Object.entries(dependencies(files) || {});

  if (deps.length === 0) return htmlTemplate;

  const doc = parser.parseFromString(htmlTemplate, 'text/html');
  const libraries = getConfiguredLibraries(files);

  deps
    .map(([name, version]) => dependencySource({ name, version }, libraries))
    .forEach((url) => {
      const scriptTag = doc.createElement('script');
      scriptTag.src = url;

      doc.head.appendChild(scriptTag);
    });

  return `<!DOCTYPE html>${doc.documentElement.outerHTML}`;
};

export const getComputedIndexHtml = (files) => {
  try {
    if (isPackageJSONEnabled) {
      const htmlTemplate = template(files);
      const htmlWithBundleScriptTemplate = injectBundleScript(
        htmlTemplate,
        files
      );
      const indexHtml = injectDependenciesScript(
        htmlWithBundleScriptTemplate,
        files
      );
      return indexHtml;
    } else {
      return template(files);
    }
  } catch (err) {
    console.log(err);
  }
};
