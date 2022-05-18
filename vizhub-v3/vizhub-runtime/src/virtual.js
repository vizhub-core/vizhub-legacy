// A Rollup plugin for a virtual file system.
// Inspired by https://github.com/Permutatrix/rollup-plugin-hypothetical/blob/master/index.js

const js = (name) => (name.endsWith('.js') ? name : name + '.js');

export const virtual = (files) => ({
  name: 'virtual',
  resolveId: (id) => (id.startsWith('./') ? id : null),
  load: (id) => (id.startsWith('./') ? files[js(id.substring(2))] : null),
});
