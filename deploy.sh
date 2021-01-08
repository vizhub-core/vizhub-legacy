#!/bin/bash
git pull
npm install
npm run lerna
sh ./buildFrontend.sh

# Flush logs so they don't accumulate and cause disk usage crashes.
pm2 flush

pm2 restart all --update-env
