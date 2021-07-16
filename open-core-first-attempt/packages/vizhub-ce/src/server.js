import { server, vizPageServerPlugin } from 'vizhub-core/server';

const plugins = [vizPageServerPlugin()];

server(plugins);
