import magicSandbox from './magicSandbox';
import { getText } from './accessors';
import { dependencies, vizhubLibraries, dependencySource } from './packageJson';
import { isPackageJSONEnabled } from './featureFlags';

const template = (files) => getText(files, 'index.html');
const bundle = (files) => getText(files, 'bundle.js');

// Dynamic require in a Node environment.
let parser;
if (typeof module !== 'undefined' && module.exports) {
  const { DOMParser } = require('xmldom');
  parser = new DOMParser();
} else {
  parser = new DOMParser();
}

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
  const deps = Object.entries(dependencies(files));

  if (deps.length === 0) return htmlTemplate;

  const doc = parser.parseFromString(htmlTemplate, 'text/html');
  const libraries = vizhubLibraries(files);

  deps
    .map(([name, version]) => dependencySource({ name, version }, libraries))
    .forEach((url) => {
      const scriptTag = doc.createElement('script');
      scriptTag.src = url;

      doc.head.appendChild(scriptTag);
    });

  return `<!DOCTYPE html>${doc.documentElement.outerHTML}`;
};

const transform = (files) =>
  files
    .filter((file) => file.name !== 'index.html')
    .reduce((accumulator, file) => {
      accumulator[file.name] = {
        content: file.text,
      };
      return accumulator;
    }, {});

export const computeSrcDoc = (files) => {
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
    return magicSandbox(indexHtml, transform(files));
  } else {
    return magicSandbox(template(files), transform(files));
  }
};
