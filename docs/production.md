What follows are the steps required to set up this app on a production instance.

Install Node.js

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
npm install -g lerna
lerna bootstrap
npm run test
```

If errors occur regarding missing packages, try this:

```
lerna clean
lerna bootstrap
npm run test
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
  server_name datavis.tech;
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
