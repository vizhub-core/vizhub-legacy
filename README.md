# [VizHub](https://vizhub.com)

In development the codebase uses React, Node, lerna, and an in-memory database.

To set up your development environment:

Export the environment variables below.

```
cd vizhub
npm install -G lerna # one time only
lerna bootstrap
cd packages/neoBackend
npm run dev # Leave this open in a console tab. Serves on port 4000
```
In another terminal:

```
cd ../packages/neoFrontend
npm start # Leave this open, it's a `create-react-app` dev server on port 3000
```

To login, we use the Github integration with the development credentials below.

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

In your beloved `.bashrc` or any source for environment variables:

```
export REACT_APP_VIZHUB_JWT_SECRET=fakefaksdashfjkdsahjfkdjakdhfjdk7
export REACT_APP_VIZHUB_GITHUB_CLIENT_ID=17ed8d9fa67e695f1118
export VIZHUB_GITHUB_CLIENT_SECRET=b7673605d16aee3c66bb693578d4e1e2dac61baa
export REACT_APP_VIZHUB_STRIPE_BASIC_PRICE_ID=price_fakehfdjkashfdjksahjkhdu
export REACT_APP_VIZHUB_STRIPE_PRO_PRICE_ID=price_fakehfdjksahjfkdhjskurd8
export REACT_APP_VIZHUB_STRIPE_PUBLISHABLE_KEY=pk_test_fakeskahfdjksahjkfdhjhjd
export VIZHUB_STRIPE_SECRET_KEY=sk_test_fakehdjksfhafjkhsdjkfhdj
export VIZHUB_STRIPE_WEBHOOK_SECRET=whsec_faked
export VIZHUB_STRIPE_DOMAIN=http://localhost:3000
```

If you have MongoDB installed and want to use it:
```
export VIZHUB_MONGO_URI=mongodb://localhost:27017/vizhub
```

Don't forget to `source ~/.bashrc`!

# Codebase Maintenance

Run Prettier on all files:

`lerna run prettier`

Run Pretter within a package directory (e.g. `neoFrontend`):

`npm run prettier`

Upgrade all dependencies:

```
npm install -g npm-check-updates
lerna exec -- ncu -u
```

Update all `package-lock.json` files (necessary for CI):

`lerna exec -- npm i`

# Using MongoDB in Development

For a more persistent experience during development, you can opt into using MongoDB.

Just set this environment variable:

```
VIZHUB_MONGO_URI=mongodb://localhost:27017/vizhub
```
