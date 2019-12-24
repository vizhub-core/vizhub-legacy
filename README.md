# VizHub

https://vizhub.com

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
