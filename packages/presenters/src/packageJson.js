import { getText } from './accessors';

const EMPTY_PKG_JSON = { dependencies: {}, vizhub: {} };
export const packageJSON = (files) => {
  const packageJsonText = getText(files, 'package.json');
  try {
    const pkg = packageJsonText ? JSON.parse(packageJsonText) : EMPTY_PKG_JSON;
    return pkg;
  } catch (error) {
    console.log(error);
    return EMPTY_PKG_JSON;
  }
};

export const dependencies = (files) => packageJSON(files).dependencies;

export const vizhubLibraries = (files) => {
  const vizhubConfig = packageJSON(files).vizhub;
  return vizhubConfig ? vizhubConfig.libraries : {};
};

export const dependencySource = ({ name, version }, libraries) => {
  const path = libraries[pkg] ? libraries[pkg].path || '' : '';
  // unpkg uses file from unpkg or main field when no file specifid in url
  return `https://unpkg.com/${name}@${version}${path}`;
};
