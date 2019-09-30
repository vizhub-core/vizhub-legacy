What follows are the steps required to set up this app on a production instance.

These instructions assume an Ubuntu server instance. In AWS, a "medium" instance is recommended. The build step may cause the VM to run out of memory on a "small" instance.

## Preparing the VM

Install Ubuntu packages required by NPM packages used by VizHub.

Install dependencies of the `sharp` package

```
sudo apt update
sudo apt install python build-essential -y
```

Install dependencies of [Puppeteer](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md):

```
sudo apt install gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils -y
```

Install Node.js using [NVM](https://github.com/creationix/nvm)

```
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
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
  server 127.0.0.1:3000;
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

Install MongoDB (see also [Install MongoDB Community Edition on Ubuntu](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)):

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
sudo apt-get update
sudo apt-get install mongodb-org -y
sudo service mongod start
```

Configure [GitHub OAuth Tokens](https://github.com/organizations/datavis-tech/settings/applications/813714) and MongoDB URL following in `packages/web/.env`. Here's a sample of what the `.env` file should look like:

```
GITHUB_ID=1937fa078932032536f9
GITHUB_SECRET=97892345784932b789a78f9d89c789c7890c2143
MONGO_URI=mongodb://localhost:27017/vizhub
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
git clone git@github.com:datavis-tech/vizhub.git
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

Build and start the Web server

```
cd packages/web/
npm run build
pm2 start --name app npm -- start
```

Start image generation service

```
cd ../imageGenerationService/
pm2 start --name image-generation-service npm -- start
```

# VizHub 2.0

`~.bashrc`

```
export REACT_APP_VIZHUB_GITHUB_CLIENT_ID=1a25f9b4693754964a7f
export REACT_APP_VIZHUB_GITHUB_CLIENT_SECRET=07d5db1d45ec75478390278594032780954327ff
export REACT_APP_VIZHUB_JWT_SECRET=fdsahjuyufidysyu4i3243sald89saf78
export REACT_APP_VIZHUB_WEBSOCKET_URL=wss://beta.vizhub.com
export MONGO_URI=mongodb://171.31.13.217:27017/vizhub
```


Build and start the Web server

```
cd packages/neoBackend/
npm run build
pm2 start --name app npm -- start
```

Start image generation service

```
cd ../imageGenerationService/
pm2 start --name image-generation-service npm -- start
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

In the Web app server `~/.bashrc`, set `export MONGO_URI=mongodb://171.31.13.217:27017/vizhub`, where the IP is the _internal_ ip of the database machine.

# GitHub Authorization callback URL

VizHub 1.0:

Env vars in `.bashrc`:

```
export GITHUB_ID=197238095748390275843
export GITHUB_SECRET=3c89ee6797589043728590432890542389c3c393
export MONGO_URI=mongodb://172.47.91.462:27017/vizhub
export SERVER_URL=https://vizhub.com
```

`https://vizhub.com/auth/oauth/github/callback`

VizHub 2.0:

`https://beta.vizhub.com/authenticated`
