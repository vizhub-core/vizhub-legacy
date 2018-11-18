What follows are the steps required to set up this app on a production instance.

Install Node.js using [NVM](https://github.com/creationix/nvm)

```
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
source .bashrc
nvm install node
```

Set up SSH keys (see also [https://gitlab.com/profile/keys](https://gitlab.com/profile/keys)).

```
ssh-keygen -t rsa -C "your.email@example.com" -b 4096
cat ~/.ssh/id_rsa.pub
git clone git@gitlab.com:curran/datavis-tech-2.git
```

Install dependencies & bootstrap [Lerna](https://lernajs.io) packages

```
cd datavis-tech-2/
git submodule update --init
npm install -g lerna
lerna bootstrap && npm run test
```

If errors occur regarding missing packages, try this:

```
lerna clean
lerna bootstrap && npm run test
```

Start the Web server

```
cd packages/web/
npm run build
npm install -g pm2
pm2 start npm -- start
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

Set up HTTPS by following instructions at https://certbot.eff.org/lets-encrypt/ubuntuartful-nginx

Install MongoDB (see also [Install MongoDB Community Edition on Ubuntu](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)):

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
sudo apt-get update
sudo apt-get install mongodb-org -y
sudo service mongod start
```

Last but not least, configure [GitHub OAuth Tokens](https://github.com/organizations/datavis-tech/settings/applications/813714) and MongoDB URL following in `packages/web/.env`. Here's a sample of what the `.env` file should look like:

```
GITHUB_ID=1937fa078932032536f9
GITHUB_SECRET=97892345784932b789a78f9d89c789c7890c2143
MONGO_URI=mongodb://localhost:27017/vizhub
```

Using Elastic Block Store

We use [Amazon Elastic Block Store](https://aws.amazon.com/ebs/) for permanent storage of the MongoDB database content.

To set up, in AWS Web UI, create volume, attach to VM (use default of `dev/sdf`).

See also http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-using-volumes.html

```
lsblk
sudo file -s /dev/xvdf # should output "/dev/xvdf: data"
sudo mkfs -t ext4 /dev/xvdf # Only run this if previous command said "data"
sudo mkdir /data
sudo mount /dev/xvdf /data
sudo cp /etc/fstab /etc/fstab.orig
sudo vim /etc/fstab
# paste this: /dev/xvdf       /data   ext4    defaults,nofail        0       2
sudo mount -a

sudo mkdir /data/mongodb
sudo chmod go+w /data/mongodb

sudo service mongod stop
sudo vim /etc/mongod.conf
# default dbPath is:
#   dbPath: /var/lib/mongodb
# change it to:
#   dbPath: /data/mongodb
sudo service mongod start
tail -f /var/log/mongodb/mongod.log
```
