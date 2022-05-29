// This module is responsible for bundling the code using Rollup.
import { rollup } from 'rollup';
import { input } from './constants';
import { virtual } from './virtual';
import { getGlobals } from './getGlobals';

// Set to true to get values for test/expectedValues.js
// Works well with `it.only()` to isolate a specific test.
const printExpectedOutput = false;

// TODO run in a Web Worker
export const build = async ({ files, includeSourcemaps = false }) => {
  //const warnings = [];
  const onwarn = (warning) => {
    console.log('TODO keep track of and report warnings');
    console.log(warning);
    console.log(JSON.parse(JSON.stringify(warning)));
    //warnings.push(JSON.parse(JSON.stringify(warning)));
  };
  const inputOptions = { input, plugins: virtual(files), onwarn };
  const outputOptions = {
    // Use UMD format for maximum portability.
    format: 'umd',

    // Introduce a browser global called `App`.
    name: 'App',

    // Enable sourcemaps so that we can trace errors back to correct line numbers.
    sourcemap: true,
    //    interop: 'default',
  };
  try {
    const globals = getGlobals(files);

    if (globals) {
      inputOptions.external = Object.keys(globals);
      outputOptions.globals = globals;
    }

    const bundle = await rollup(inputOptions);
    const { code, map } = (await bundle.generate(outputOptions)).output[0];

    if (includeSourcemaps) {
      return code + '\n//# sourceMappingURL=' + map.toUrl();
    }

    if (printExpectedOutput) {
      console.log('code: `' + code + '`');
      //      console.log('warnings: `' + JSON.stringify(warnings, null, 2) + '`');
    }

    // TODO track warnings
    //return warnings.length > 0 ? { code, warnings } : { code };

    return { code };
  } catch (error) {
    console.log('TODO handle this error');
    console.log(error);
    //const serializableError = JSON.parse(JSON.stringify(error));
    //serializableError.name = error.name;
    //serializableError.message = error.message;
    //return { error: serializableError };
  }
};
