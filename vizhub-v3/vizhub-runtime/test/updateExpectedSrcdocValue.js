import fs from 'fs';

export const updateExpectedSrcdocValue = (name, value) => {
  fs.writeFileSync(
    `test/expectedValues/${name}.js`,
    `export const ${name} = \`${value}\`;`
  );
};
