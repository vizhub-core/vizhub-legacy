const { renderSync } = require('sass');
const { writeFileSync } = require('fs');

// TODO minify for production build.
console.log('Building CSS...');
writeFileSync(
  './public/build/styles.css',
  renderSync({ file: 'src/styles/index.scss' }).css.toString()
);
