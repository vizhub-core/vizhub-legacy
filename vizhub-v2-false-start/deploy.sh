## Setup for the environment
# sudo apt upgrade
# ssh-keygen -t rsa -b 4096 -C "your.email@somewhere.com"
# eval "$(ssh-agent -s)"
# cat ~/.ssh/id_rsa.pub
# git clone git@github.com:curran/vizhub2.git
# cd vizhub2/

## Install Node.js
# wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
# source ~/.bashrc
# nvm install node

## Set up NGINX
# sudo apt-get install nginx -y
# sudo vi /etc/nginx/sites-available/default
# sudo /etc/init.d/nginx restart
# tail /var/log/nginx/error.log -f

## Check in with PM2
# pm2 monit

## Daily Deploy
# git checkout master
git pull
rm -rf packages/backend/build/
npm run bootstrap
cd packages/frontend/; npm run build
pm2 restart all
