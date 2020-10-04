import magicSandbox from './magicSandbox';
import { getText } from './accessors';

const dependencies = files => {
  const packageJsonText = getText(files, 'package.json');
  try {
    const pkg = packageJsonText ? JSON.parse(packageJsonText) : {dependencies: {}};
    return pkg.dependencies || {};
  } catch (error){
    console.log(error);
    return {};
  }
};

const template = (files) => getText(files, 'index.html');

const parser = new DOMParser();

const injectBundleScript = (htmlTemplate) => {
  const doc = parser.parseFromString(htmlTemplate, 'text/html');

  if (!doc.querySelector('[src="bundle.js"]')) {
    const bundleScriptTag = doc.createElement('script');
    bundleScriptTag.src = 'bundle.js';
    doc.body.appendChild(bundleScriptTag);
    return `<!DOCTYPE html>${doc.documentElement.outerHTML}`;
  } else {
    return htmlTemplate;
  }
};

const injectDependenciesScript = (htmlTemplate, files) => {
  const doc = parser.parseFromString(htmlTemplate, 'text/html');
  
  Object
    .entries(dependencies(files))
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
  const htmlTemplate = template(files);
  const indexHtml = injectDependenciesScript(injectBundleScript(htmlTemplate), files);

  return magicSandbox(indexHtml, transform(files));
};
