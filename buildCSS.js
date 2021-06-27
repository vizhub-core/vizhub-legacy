const { renderSync } = require('sass');
const { writeFileSync } = require('fs');

console.log('Building CSS...');
writeFileSync(
  './public/styles.css',
  renderSync({ file: 'src/styles/index.css' }).css.toString()
);
