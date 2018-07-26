export const Bundler = () => {
  const bundle = files => {
    console.log({ files });
    return Promise.resolve([
      { name: 'bundle.js', text: 'blah' }
    ]);
  };
  return { bundle };
};
