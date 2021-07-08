import { VizHub } from './index.js';
import { vizPage } from './plugins/vizPage.js';

export const exampleApp = VizHub({ plugins: [vizPage] });
//export const exampleApp = VizHub({ plugins: [vizPage()] });
