import { client, homePageClientPlugin } from 'vizhub-core/client';

import { vizPageClientPlugin } from 'vizhub-plugin-viz-page/client';

const plugins = [homePageClientPlugin(), vizPageClientPlugin()];

client(plugins);
