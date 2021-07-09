import { VizHub } from './index.js';
import { vizPage } from './plugins/vizPage.js';

// This "app" is an instantiation of VizHub core
// with open source plugins.
const app = VizHub({ plugins: [vizPage()] });

// Command is expected to be "start" or "build".
const [command] = process.argv.slice(-1);

// Run the command against the app.
app[command]();
