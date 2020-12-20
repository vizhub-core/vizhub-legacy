import vizhubLibraries from 'vizhub-libraries';
import { getConfiguredLibraries, getDependencies } from './packageJson';

const GLOBAL_ALIASES = [
  'parent',
  'top',
  'frames',
  'self',
  'window',
  'globalThis',
];

const sniffGlobals = async ({ name, path, version }) => {
  // TODO: fetch for server environment
  const response = await fetch(`https://unpkg.com/${name}@${version}${path}`);
  const packageSrcReader = response.body.getReader();

  let packageSrc = '';
  let stream = await packageSrcReader.read();
  while (!stream.done) {
    packageSrc = packageSrc + new TextDecoder('utf-8').decode(stream.value);
    stream = await packageSrcReader.read();
  }

  const globals = {};

  try {
    Function(
      ...GLOBAL_ALIASES,
      `try{(function(){${packageSrc}}.bind(self))()}catch(err){};return ${GLOBAL_ALIASES};`
    )(...new Array(GLOBAL_ALIASES.length).fill(globals));
  } catch (error) {
    console.log(error);
  }

  return globals;
};

export const getLibraries = async (files) => {
  const dependencies = getDependencies(files);
  const configuredLibraries = getConfiguredLibraries(files);
  const userLibrariesNames = configuredLibraries
    ? Object.keys(configuredLibraries)
    : [];

  const userLibraries = {};
  for (const packageName of userLibrariesNames) {
    const userPackageGlobalName = configuredLibraries[packageName].global;

    let packageGlobals = {};
    if (userPackageGlobalName) {
      packageGlobals = { [packageName]: userPackageGlobalName };
    } else {
      packageGlobals = await sniffGlobals({
        name: packageName,
        path: configuredLibraries[packageName] ? configuredLibraries[packageName].path || '' : '',
        version: dependencies[packageName]
      });
    }

    // in case if user created settings but not provide global and sniffing failed to find globals,
    // stub global with vizhub known global name
    const globalName =
      packageGlobals[packageName] || vizhubLibraries[packageName];

    if (globalName) {
      userLibraries[packageName] = globalName;
    } else {
      console.warn(
        `There is no global name for ${packageName}.\n Please add it to "vizhub.${packageName}.global" section in package.json.`
      );
    }
  }

  return { ...vizhubLibraries, ...userLibraries };
};
