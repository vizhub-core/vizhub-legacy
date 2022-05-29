// TODO make this robust to malformed arguments (add tests),
// since this can be sourced from user generated `package.json` content.
export const cdn = ({ dependencies, libraries }) =>
  Object.keys(dependencies)
    .map((dependency, i) => {
      const version = dependencies[dependency];
      const path = libraries[dependency].path;
      const src = `https://cdn.jsdelivr.net/npm/${dependency}@${version}${path}`;
      const indent = i > 0 ? '    ' : '';
      return `${indent}<script src="${src}"></script>`;
    })
    .join('\n');
