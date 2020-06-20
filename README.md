# [VizHub](https://vizhub.com)

To set up your development environment:

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

In your beloved `.bashrc`:

```
export REACT_APP_VIZHUB_JWT_SECRET=fakefaksdashfjkdsahjfkdjakdhfjdk7
export REACT_APP_VIZHUB_GITHUB_CLIENT_ID=fakefdsahjkfhdasjkh3
export REACT_APP_VIZHUB_GITHUB_CLIENT_SECRET=fakefhdjksalhffjkdslahfjkdlsafhdjksahdhf
export REACT_APP_VIZHUB_STRIPE_BASIC_PRICE_ID=price_fakehfdjkashfdjksahjkhdu
export REACT_APP_VIZHUB_STRIPE_PRO_PRICE_ID=price_fakehfdjksahjfkdhjskurd8
export REACT_APP_VIZHUB_STRIPE_PUBLISHABLE_KEY=pk_test_fakeskahfdjksahjkfdhjhjd
export VIZHUB_STRIPE_SECRET_KEY=sk_test_fakehdjksfhafjkhsdjkfhdj
export VIZHUB_STRIPE_WEBHOOK_SECRET=whsec_faked
export VIZHUB_STRIPE_DOMAIN=http://localhost:3000
```

Don't forget to `source ~/.bashrc`!
