#!/bin/bash
git pull
lerna bootstrap
sh ./buildFrontend.sh
pm2 restart all --update-env
