import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import rollupReplace from "@rollup/plugin-replace";

export default {
  input: 'index.js',
  output: {
    file: 'bundle.js',
    format: 'umd',
    name: 'BrowserBabel',
  },
  plugins: [
nodeResolve(), commonjs(), json(), nodePolyfills()


// Original Rollup config from
// https://github.com/babel/babel/blob/main/Gulpfile.mjs#L331
 rollupBabelSource(),
            rollupReplace({
              preventAssignment: true,
              values: {
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
                BABEL_VERSION: JSON.stringify(babelVersion),
                VERSION: JSON.stringify(version),
              },
            }),
            rollupCommonJs({
              include: [
                /node_modules/,
                "packages/babel-runtime/regenerator/**",
                "packages/babel-preset-env/data/*.js",
                // Rollup doesn't read export maps, so it loads the cjs fallback
                "packages/babel-compat-data/*.js",
                "packages/*/src/**/*.cjs",
                // See the comment in this file for the reason to include it
                "packages/babel-standalone/src/dynamic-require-entrypoint.cjs",
              ],
              dynamicRequireTargets: [
                // https://github.com/mathiasbynens/regexpu-core/blob/ffd8fff2e31f4597f6fdfee75d5ac1c5c8111ec3/rewrite-pattern.js#L48
                resolveChain(
                  import.meta.url,
                  "./packages/babel-helper-create-regexp-features-plugin",
                  "regexpu-core",
                  "regenerate-unicode-properties"
                ) + "/**/*.js",
              ],
              // Never delegate to the native require()
              ignoreDynamicRequires: true,
              // Align with the Node.js behavior
              defaultIsModuleExports: true,
            }),
            rollupBabel({
              envName,
              babelrc: false,
              babelHelpers: "bundled",
              extends: "./babel.config.js",
              extensions: [".ts", ".js", ".mjs", ".cjs"],
            }),
            rollupNodeResolve({
              extensions: [".ts", ".js", ".mjs", ".cjs", ".json"],
              browser: targetBrowsers,
              exportConditions: targetBrowsers ? ["browser"] : [],
              // It needs to be set to 'false' when using rollupNodePolyfills
              // https://github.com/rollup/plugins/issues/772
              preferBuiltins: !targetBrowsers,
            }),
            rollupJson(),
            targetBrowsers &&
              rollupNodePolyfills({
                sourceMap: sourcemap,
                include: "**/*.{js,cjs,ts}",
              }),

]
};
