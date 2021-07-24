import {
  server,
  homePageServerPlugin,
  vizPageServerPlugin,
} from 'vizhub-core/server';

const plugins = [homePageServerPlugin(), vizPageServerPlugin()];

server(plugins);
