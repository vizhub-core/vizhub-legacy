# [VizHub](https://vizhub.com)

To set up your development environment:

```
cd vizhub
npm install -G lerna # one time only
lerna bootstrap
cd packages/neoBackend
npm start # Leave this open in a console tab. Serves on port 4000
```
In another terminal:

```
cd ../packages/neoFrontend
npm start # Leave this open, it's create-react-app dev server on port 3000
```

To run the end-to-end tests (in another terminal):

```
cd ../packages/neoCI
npm test # Beware: auth as CI test case is a bit brittle, fails sporadically
```

These tests use [Puppeteer](https://github.com/puppeteer/puppeteer), which has some [system-level dependencies](https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix) that need to be installed separately (OS-specific).
