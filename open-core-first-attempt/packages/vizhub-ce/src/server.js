import { server, homePageServerPlugin } from 'vizhub-core/server';
import { vizPageServerPlugin } from 'vizhub-plugin-viz-page/server';

const plugins = [homePageServerPlugin(), vizPageServerPlugin()];

server(plugins);
