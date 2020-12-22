import { i18n } from 'vizhub-i18n';
import { zipFiles } from './zipFiles';
import vizhubLibraries from 'vizhub-libraries';
import { getFileIndex, dependencies } from 'vizhub-presenters';

export class ExportVisualization {
  constructor({ visualizationGateway }) {
    this.visualizationGateway = visualizationGateway;
  }

  async execute(requestModel) {
    if (!requestModel.id) {
      throw new Error(i18n('errorNoId'));
    }

    const visualization = await this.visualizationGateway.getVisualization({
      id: requestModel.id,
    });

    const packageJSONDependencies = dependencies(visualization.content.files);
    const packageJSONDependencyNames = Object.keys(packageJSONDependencies);

    const globals = packageJSONDependencyNames.reduce(
      (globals, packageName) => {
        if (vizhubLibraries[packageName]) {
          delete globals[packageName];
        }

        return globals;
      },
      { ...vizhubLibraries }
    );

    const globalsJSON = JSON.stringify(globals);
    const externalJSON = JSON.stringify(Object.keys(globals));

    const files = visualization.content.files.concat([
      {
        name: 'rollup.config.js',
        text: `const buble = require('@rollup/plugin-buble');
  const { nodeResolve } = require('@rollup/plugin-node-resolve');
  
  export default {
  input: 'index.js',
  external: ${externalJSON},
  output: {
    file: 'bundle.js',
    format: 'iife',
    sourcemap: true,
    globals: ${globalsJSON}
  },
  plugins: [nodeResolve(), buble({exclude: ['node_modules/**/*']})]
};`,
      },
    ]);

    const packageJSONFile = {
      name: 'package.json',
      text: `{
"scripts": {
  "build": "rollup -c"
},
"dependencies": ${JSON.stringify(packageJSONDependencies)},
"devDependencies": {
  "rollup": "latest",
  "@rollup/plugin-buble": "latest",
  "@rollup/plugin-node-resolve": "latest"
}
}`,
    };

    const packageJSONFileIndex = getFileIndex(files, 'package.json');

    if (packageJSONFileIndex === -1) {
      files.append(packageJSONFile);
    } else {
      files[packageJSONFileIndex] = packageJSONFile;
    }

    const zipFileBuffer = zipFiles(files);
    const zipFileName = visualization.info.title + '.zip';

    return { zipFileBuffer, zipFileName };
  }
}
