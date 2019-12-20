#!/bin/bash
git pull
lerna bootstrap
cd packages/neoFrontend/
npm run build
rm -rf ../neoBackend/build/
cp -r build ../neoBackend/build
pm2 restart all
