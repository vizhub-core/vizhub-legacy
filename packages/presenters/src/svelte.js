// Derived from https://github.com/rollup/rollup-plugin-buble/blob/master/src/index.js
import { createFilter } from 'rollup-pluginutils';

const SVELTE_URL = 'https://unpkg.com/svelte@3.31.0';

async function transform(code, id) {
  const { compile } = await import('svelte/compiler');

  const result = compile(code, { filename: 'code.svelte' });

  return result.js;
}

const fetchCache = new Map();
function fetchIfUncached(url) {
  if (fetchCache.has(url)) {
    return fetchCache.get(url);
  }

  const promise = fetch(url)
    .then(async (r) => {
      if (r.ok) {
        return {
          url: r.url,
          body: await r.text(),
        };
      }

      throw new Error(await r.text());
    })
    .catch((err) => {
      fetchCache.delete(url);
      throw err;
    });

  fetchCache.set(url, promise);
  return promise;
}

export default function sveltePlugin(options) {
  if (!options) options = {};
  const filter = createFilter(options.include, options.exclude);

  if (!options.transforms) options.transforms = {};
  options.transforms.modules = false;

  return {
    name: 'svelte',

    resolveId(importee, importer) {
      if (importee === `svelte`) return `${SVELTE_URL}/index.mjs`;
      if (importee.startsWith(`svelte/`)) {
        return `${SVELTE_URL}/${importee.slice(7)}/index.mjs`;
      }
      if (importer && importer.startsWith(SVELTE_URL)) {
        const resolved = new URL(importee, importer).href;
        if (resolved.endsWith('.mjs')) return resolved;
        return `${resolved}/index.mjs`;
      }
    },
    async load(resolved) {
      if (resolved.startsWith(SVELTE_URL)) {
        const res = await fetchIfUncached(resolved);
        return res.body;
      }
    },
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
