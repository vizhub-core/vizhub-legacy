export const Bundler = () => {
  const bundle = files => {
    return Promise.resolve([
      { name: 'bundle.js', text: 'blah' }
    ]);
  };
  return { bundle };
};
