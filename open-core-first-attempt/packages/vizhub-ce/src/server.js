import { server, homePageServerPlugin } from 'vizhub-core/server';
import { vizPageServerPlugin } from 'vizhub-plugin-viz-page/server';
import { accessControlServerPlugin } from 'vizhub-plugin-access-control/server';

const plugins = [homePageServerPlugin(), vizPageServerPlugin(), accessControlServerPlugin()];

server(plugins);
