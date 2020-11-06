#!/bin/bash
git pull
lerna bootstrap
sh ./buildFrontend.sh

# Flush logs so they don't accumulate and cause disk usage crashes.
pm2 flush

pm2 restart all --update-env
