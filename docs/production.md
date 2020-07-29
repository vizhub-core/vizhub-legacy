What follows are the steps required to set up this app on a production instance.

These instructions assume an Ubuntu server instance. In AWS, a "medium" instance is recommended. The build step may cause the VM to run out of memory on a "small" instance.

## Preparing the VM

Install Ubuntu packages required by NPM packages used by VizHub.

Install dependencies of the `sharp` package

```
sudo apt update
sudo apt install python build-essential -y
```

Install dependencies of [Puppeteer](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix):

```
sudo apt install ca-certificates fonts-liberation gconf-service libappindicator1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils -y
```

Install Node.js using [NVM](https://github.com/creationix/nvm)

```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
source .bashrc
nvm install node
```

Set up [SSH keys](https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account).

```
ssh-keygen -t rsa -C "your.email@example.com" -b 4096
cat ~/.ssh/id_rsa.pub
```

Set up NGINX so that it will serve the app from port 3000 to port 80.

```
sudo apt-get install nginx -y
sudo vim /etc/nginx/sites-available/default
```

Paste the following:

```
upstream app_vizhub {
  server 127.0.0.1:4000;
  keepalive 8;
}

server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name vizhub.com;
  access_log /var/log/nginx/vizhub.log;

  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
    
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    proxy_pass http://app_vizhub/;
    proxy_redirect off;
  }
}
```

Put this configuration into action, check for errors.

```
sudo /etc/init.d/nginx restart
tail /var/log/nginx/error.log
```

Set up HTTPS by following instructions at https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx

After certbot, should look something like this working config:

```
upstream app_vizhub {
  server 127.0.0.1:4000;
  keepalive 8;
}

server {
  server_name vizhub.com;
  access_log /var/log/nginx/vizhub.log;

  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;

    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    proxy_pass http://app_vizhub/;
    proxy_redirect off;
  }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/vizhub.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/vizhub.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}


server {
    if ($host = vizhub.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


  listen 80 default_server;
  listen [::]:80 default_server;
  server_name vizhub.com;
    return 404; # managed by Certbot


}

```

Install MongoDB (see also [Install MongoDB Community Edition on Ubuntu](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)):

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
sudo apt-get update
sudo apt-get install mongodb-org -y
sudo service mongod start
```

Using Elastic Block Store

We use [Amazon Elastic Block Store](https://aws.amazon.com/ebs/) for permanent storage of the MongoDB database content.

To set up, in AWS Web UI, create volume, attach to VM (use default of `dev/sdf`).

See also http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-using-volumes.html

Setting up for the first time:

```
lsblk
sudo file -s /dev/xvdf # should output "/dev/xvdf: data"
sudo mkfs -t ext4 /dev/xvdf # [Initial setup only] Only run this if previous command said "data"
sudo mkdir /data
sudo mount /dev/xvdf /data
sudo cp /etc/fstab /etc/fstab.orig
sudo vim /etc/fstab
# paste this: /dev/xvdf       /data   ext4    defaults,nofail        0       2
sudo mount -a

sudo mkdir /data/mongodb # [Initial setup only]
sudo chmod go+w /data/mongodb # [Initial setup only]

sudo service mongod stop
sudo vim /etc/mongod.conf
# default dbPath is:
#   dbPath: /var/lib/mongodb
# change it to:
#   dbPath: /data/mongodb
sudo service mongod start
sudo tail -f /var/log/mongodb/mongod.log

# If you get permissions-related errors:
sudo chown mongodb /data/mongodb -R
```

## Set Up VizHub

```
git clone git@github.com:curran/vizhub.git
```

Set up the [vizhub-ui](https://github.com/datavis-tech/vizhub-ui) submodule

```
cd vizhub
git submodule update --init
```

Install dependencies & bootstrap [Lerna](https://lernajs.io) packages

```
npm install -g lerna
lerna bootstrap && npm run test
```

If errors occur regarding missing packages, try this:

```
lerna clean
lerna bootstrap && npm run test
```

Install PM2

```
npm install -g pm2
```

Start image generation service

```
cd ../imageGenerationService/
pm2 start --cron "0 * * * *" --name image-generation-service npm -- start
```

The above command sets up PM2 to mimic a CRON job that restarts the image generation service every hour. This is a hacky solution for an unknown instability within the image generation service itself.

# VizHub 2.0

`~/.bashrc`

```
export VIZHUB_GITHUB_CLIENT_SECRET=07d5db1d45ec75478390278594032780954327ff
export VIZHUB_MONGO_URI=mongodb://171.31.13.217:27017/vizhub
export REACT_APP_VIZHUB_GITHUB_CLIENT_ID=1a25f9b4693754964a7f
export REACT_APP_VIZHUB_JWT_SECRET=fdsahjuyufidysyu4i3243sald89saf78
export REACT_APP_VIZHUB_WEBSOCKET_URL=wss://beta.vizhub.com
```

Build and start the Web server

```
cd packages/neoBackend/
pm2 start --name VizHubAppServer npm -- start
```

Start image generation service

```
cd ../imageGenerationService/
pm2 start --name image-generation-service npm -- start
```

To update environment variables:

```
pm2 restart all --update-env
```

# Database Server

If the MongoDB database lives in a separate machine, you'll need to do the following:

Add a rule to the security group to allow the Web app or API server to connect to the database machine. You need to use the _internal_ ip.

`sudo vim /etc/mongod.conf`

```
# network interfaces
net:
  port: 27017
#  bindIp: 127.0.0.1  <- comment out this line
```

In the Web app server `~/.bashrc`, set `export VIZHUB_MONGO_URI=mongodb://171.31.13.217:27017/vizhub`, where the IP is the _internal_ ip of the database machine.

For search, you need to set up indices like this:

```
use vizhub
db.documentInfo.createIndex( { title: "text", description: "text" } )
db.user.createIndex({ userName: 1 })
db.user.createIndex({ fullName: 1 })
```


## Database Maintenance

```
mongo
use vizhub
db.stats()
```
Check the ratio of "fsUsedSize" to "fsTotalSize".

To delete unnecessary data for ops on images:

```
db.stats()
db.o_previewImages.stats()
db.o_previewImages.drop()
db.o_thumbnailImages.stats()
db.o_thumbnailImages.drop()
```


# GitHub Authorization callback URL

`https://beta.vizhub.com/authenticated`

## Redis

[Install Redis](https://redis.io/topics/quickstart)

Enagble use of [https://github.com/share/sharedb-redis-pubsub](https://github.com/share/sharedb-redis-pubsub) for horizontal scaling by setting the following environment variable:

```
VIZHUB_REDIS_HOST=123.45.67.8
```

On the Redis server (from [Redis Quick Start](https://redis.io/topics/quickstart)):

```
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
sudo apt-get update
sudo apt install build-essential -y
make
sudo make install
redis-server --daemonize yes
redis-cli ping
redis-cli
redis-cli shutdown
redis-cli ping
sudo mkdir /etc/redis
sudo mkdir /var/redis
sudo cp utils/redis_init_script /etc/init.d/redis_6379
sudo cp redis.conf /etc/redis/6379.conf
sudo mkdir /var/redis/6379
sudo vim /etc/redis/6379.conf
sudo update-rc.d redis_6379 defaults
sudo /etc/init.d/redis_6379 start
```


## Stripe

```
export REACT_APP_VIZHUB_STRIPE_BASIC_PRICE_ID=price_fakehfdjkashfdjksahjkhdu
export REACT_APP_VIZHUB_STRIPE_PRO_PRICE_ID=price_fakehfdjksahjfkdhjskurd8
export REACT_APP_VIZHUB_STRIPE_PUBLISHABLE_KEY=pk_test_fakeskahfdjksahjkfdhjhjd
export VIZHUB_STRIPE_SECRET_KEY=sk_test_fakehdjksfhafjkhsdjkfhdj
export VIZHUB_STRIPE_WEBHOOK_SECRET=whsec_faked
export VIZHUB_STRIPE_DOMAIN=http://localhost:3000
```
