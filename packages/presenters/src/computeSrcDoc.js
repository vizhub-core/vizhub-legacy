import magicSandbox from './magicSandbox';
import { getText } from './accessors';

// Feature flag.
const packageJSON = process.env.REACT_APP_VIZHUB_PACKAGE_JSON === 'true';

const dependencies = (files) => {
  const packageJsonText = getText(files, 'package.json');
  try {
    const pkg = packageJsonText
      ? JSON.parse(packageJsonText)
      : { dependencies: {} };
    return pkg.dependencies || {};
  } catch (error) {
    console.log(error);
    return {};
  }
};

const template = (files) => getText(files, 'index.html');
const bundle = (files) => getText(files, 'bundle.js');

// Dynamic require in a Node environment.
let parser;
if(typeof module !== 'undefined' && module.exports){
  const { DOMParser } = require('xmldom')
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

  deps
    .map(([pkg, version]) => `https://unpkg.com/${pkg}@${version}`) // unpkg uses file from unpkg or main field when no file specifid in url
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
  if (packageJSON) {
    const htmlTemplate = template(files);
    const htmlWIthBundleScriptTemplate = injectBundleScript(
      htmlTemplate,
      files
    );
    const indexHtml = injectDependenciesScript(
      htmlWIthBundleScriptTemplate,
      files
    );
    return magicSandbox(indexHtml, transform(files));
  } else {
    return magicSandbox(template(files), transform(files));
  }
};
