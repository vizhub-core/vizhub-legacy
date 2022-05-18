//const parseJSON = (str) => {
//  try {
//    return JSON.parse(str);
//  } catch (error) {
//    error.code = 'INVALID_PACKAGE_JSON';
//    throw error;
//  }
//};

// Extracts the browser globals from package.json
//const browserBuildsField = 'browser-builds';
export const getGlobals = (files) => {
  //if ('package.json' in files) {
  //  const json = parseJSON(files['package.json']);
  //  if (browserBuildsField in json) {
  //    return Object.entries(json[browserBuildsField]).reduce(
  //      (accumulator, [packageName, config]) => {
  //        accumulator[packageName] = config.global;
  //        return accumulator;
  //      },
  //      {}
  //    );
  //  }
  //}
  return null;
};
