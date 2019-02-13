#!/bin/bash

git checkout master
git pull

lerna bootstrap
cd packages/web
npm run build
pm2 restart all

# If no processes are set up in PM2, run this:
# pm2 start ecosystem.config.js --env production
