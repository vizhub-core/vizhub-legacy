const { renderSync } = require('sass');
const { writeFileSync } = require('fs');

console.log('Building CSS...');
writeFileSync(
  './public/styles.css',
  renderSync({ file: 'src/styles/index.scss' }).css.toString()
);
