# vizhub-v3

## Core

Conventions for variable names:

- User
  - userName = the name of the user
- Viz

  - vizId = the id of the viz
  - vizInfo = instance of VizInfo
  - vizInfoMongoDoc = document object from raw MongoDB driver
  - vizInfoShareDoc = document object from ShareDB
  - vizInfoData = the raw data for the VizInfo constructor
  - vizContent = instance of VizContent

- Pages
  - HomePage = component that renders the page
  - page = 'HomePage'; page needs to match exactly component name
  - homePagePresenter = function that transforms input data to page inputs
  - homePagePresented = returned value from presenter

## Production

Set up NGINX so that it will serve the app from port 3000 to port 80.

```
sudo apt-get install nginx -y
sudo vim /etc/nginx/sites-available/default
```

Paste the following:

```
upstream app_vizhub {
  server 127.0.0.1:8080;
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

- Note that you'll need to change `server_name` to match the subdomain, e.g. `staging` or `beta`.

Install node via [NVM](https://github.com/nvm-sh/nvm#install--update-script)

```
nvm install node
```

[Add SSH key to GitHub account](https://docs.github.com/en/enterprise-server@3.0/github/authenticating-to-github/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)

`git clone git@github.com:curran/vizhub-v3.git`

```
cd vizhub-v3
npm install
npm start
```

[Install PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)

[Install MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

## Environment Variables

In order to ensure the environment variables persist across reboots, put them in:

```
/etc/environment
```

Example configuration:

```
export VIZHUB_MONGO_URI='mongodb://localhost:27017/vizhub'
```
