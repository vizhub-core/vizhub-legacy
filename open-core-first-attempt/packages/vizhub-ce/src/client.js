import {
  client,
  homePageClientPlugin,
  vizPageClientPlugin,
} from 'vizhub-core/client';

const plugins = [homePageClientPlugin(), vizPageClientPlugin()];

client(plugins);
