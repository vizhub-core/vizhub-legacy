process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const configFactory = require('react-scripts/config/webpack.config');
const createDevServerConfig = require('react-scripts/config/webpackDevServer.config');
const paths = require('react-scripts/config/paths');

const config = configFactory('development');
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const port = DEFAULT_PORT;

const urls = prepareUrls(
  protocol,
  HOST,
  DEFAULT_PORT,
  paths.publicUrlOrPath.slice(0, -1)
);

const devSocket = {
  warnings: warnings =>
    devServer.sockWrite(devServer.sockets, 'warnings', warnings),
  errors: errors =>
    devServer.sockWrite(devServer.sockets, 'errors', errors),
};

const compiler = createCompiler({
  appName: 'Test',
  config,
  devSocket,
  urls,
  useYarn: false,
  useTypeScript: false,
  tscCompileOnError: false,
  webpack,
});

const proxySetting = require(paths.appPackageJson).proxy;
const proxyConfig = prepareProxy(
  proxySetting,
  paths.appPublic,
  paths.publicUrlOrPath
);
const serverConfig = createDevServerConfig(
  proxyConfig,
  urls.lanUrlForConfig
);

const devServer = new WebpackDevServer(compiler, serverConfig);
// Launch WebpackDevServer.
devServer.listen(port, HOST, err => {
  if (err) {
    return console.log(err);
  }

  console.log(`Starting the development server...at ${HOST}:${DEFAULT_PORT} \n`);
});
