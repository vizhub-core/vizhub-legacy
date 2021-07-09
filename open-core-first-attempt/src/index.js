const buildWithPlugins = (plugins) => () => {
  console.log('TODO build JS');
  console.log('TODO build CSS');
};

const startWithPlugins = (plugins) => () => {
  console.log('TODO start server');
};

export const VizHub = ({ plugins = [] }) => ({
  build: buildWithPlugins(plugins),
  start: startWithPlugins(plugins),
});
