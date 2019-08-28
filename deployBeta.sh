#!/bin/bash
git pull
lerna bootstrap
cd packages/neoFrontend/
rm -rf ../neoBackend/build/
npm run build
pm2 restart all
