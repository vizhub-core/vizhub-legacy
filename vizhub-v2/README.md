## VizHub 2

This is the codebase deployed at https://vizhub.com.

Built with React, Node, Lerna, and ShareDB. Loosely based on [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

To set up your development environment:

Install dependencies:
```
cd vizhub
npm install
npm run lerna
```

Start the backend:
```
cd packages/neoBackend
npm run dev # Leave this open in a console tab. Serves on port 4000
```

Start the frontend server (in another terminal):

```
cd ../packages/neoFrontend
npm start # Leave this open, it's a `create-react-app` dev server on port 3000
```

To login, we use the Github integration with the development credentials below. Or, in development you can log in as CI (Continuous Integration) User without any need to set up GitHub authentication.

## Puppeteer Dependencies

The install step may fail with errors related to Puppeteer and Chrome. The following dependencies are required for Debian/Ubuntu Linux:

```
sudo apt install build-essential ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils -y
```

See also [Puppeteer troubleshooting](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md)

# Testing

To run the end-to-end tests (in another terminal):

```
cd ../packages/neoCI
npm test # Beware: auth as CI test case is a bit brittle, fails sporadically
```

These tests use [Puppeteer](https://github.com/puppeteer/puppeteer), which has some [system-level dependencies](https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix) that need to be installed separately (OS-specific).

If you're ever in NPM hell with `package-lock` madness, try [this](https://gist.github.com/cancerberoSgx/1892ada276992f78f488a43b3a430c9b):

```
find . -name "node_modules" -exec rm -rf '{}' +; find . -name "package-lock.json" -exec rm -rf '{}' +;
```

# Environment Variables

Without setting any environment variables, the app should work in development using an in-memory database, without the ability to authenticate via GitHub.

To set up the app to use MongoDB, export the following:

```
export VIZHUB_MONGO_URI=mongodb://localhost:27017/vizhub
export REACT_APP_VIZHUB_REDIRECT_URI=http://localhost:3000/authenticated
```

To enable authentication via GitHub, export the following:

```
export REACT_APP_VIZHUB_GITHUB_CLIENT_ID=17ed8d9fa67e695f1118
export VIZHUB_GITHUB_CLIENT_SECRET=b7673605d16aee3c66bb693578d4e1e2dac61baa
```

To enable authentication via Google, export the following:

```
export REACT_APP_VIZHUB_GOOGLE_CLIENT_ID=1089209754756-iuvb60rkf8mheiqk186n3kk7lp6sb5kr.apps.googleusercontent.com
```

To enable authentication via Facebook, export the following:

```
export REACT_APP_VIZHUB_FACEBOOK_CLIENT_ID=39270402107636
export VIZHUB_FACEBOOK_CLIENT_SECRET=13aedfb953666b2a425e5ba00deef3c1
```

Don't forget to `source ~/.bashrc`!

Additional environment variables for use in production only are detailed in [Production Docs](docs/production.md).

# Codebase Maintenance

The codebase uses Prettier to auto-format code. Please run Prettier on all files after making changes:

`lerna run prettier`

You can run Pretter within a single package directory (e.g. `neoFrontend`):

`npm run prettier`

Upgrade all dependencies:

```
npm install -g npm-check-updates
lerna exec -- ncu -u
```
