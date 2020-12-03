// Derived from https://github.com/rollup/rollup-plugin-buble/blob/master/src/index.js
import { createFilter } from 'rollup-pluginutils';
import { compile } from 'svelte/compiler';

function transform(code, id) {

  const result = compile(code, Object.assign({
      generate: 'dom',
      format: 'esm',
      dev: true,
      filename: 'code.svelte'
    }, {
      loopGuardTimeout: 100
    }));

    return result.js;
}

export default function sveltePlugin(options) {
  if (!options) options = {};
  var filter = createFilter(options.include, options.exclude);

  if (!options.transforms) options.transforms = {};
  options.transforms.modules = false;

  return {
    name: 'svelte',

    transform: function (code, id) {
      if (!filter(id)) return null;
      if (!/\.svelte$/.test(id)) return null;

      try {
        return transform(code, options);
      } catch (e) {
        e.plugin = 'svelte';
        if (!e.loc) e.loc = {};
        e.loc.file = id;
        e.frame = e.snippet;
        throw e;
      }
    },
  };
}

