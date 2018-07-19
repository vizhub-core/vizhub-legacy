# This script is for deploying a new build to production.
git checkout master
git pull
lerna bootstrap
cd packages/web
npm run build
pm2 restart all

# If no processes are set up in PM2, run this:
# pm2 start npm -- start
