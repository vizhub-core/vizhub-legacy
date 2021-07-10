import { server, vizPagePlugin } from 'vizhub-core';

const plugins = [vizPagePlugin()];

server(plugins);
