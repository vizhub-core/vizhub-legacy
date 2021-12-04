# Deployment

How to deploy this on your server.

These instructions were create based on AWS EC2, using Ubuntu server, but should work for other environments.

## Server Setup

Add security rules to accept HTTP and HTTPS.

Update system packages.

`sudo apt update && sudo apt upgrade -y`

Install NGINX.

`sudo apt install nginx -y`

[Install NVM](https://github.com/nvm-sh/nvm#install--update-script)

`source ~/.bashrc`
`nvm install node`

## Build & Copy Files

Strategy: run the build locally in your dev environment, then copy the built files to the server.

In your local development environment, build the app:

```
cd vizhub/vizhub3
npm install
npm run build
``

Copy the built files to the server:

```
scp -i myKey.pem -r ./build ubuntu@myIPAddress:~
```

## NGINX Configuration

Set up NGINX so that it will serve the app from port 8080 to port 80.

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

Put this configuration into action & check for errors.

```
sudo /etc/init.d/nginx restart
tail /var/log/nginx/error.log
```

## Domain Setup & SSL

Configure your DNS A record to point to the server IP.

[Set up HTTPS with Certbot](https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal).

Start the server:

```
nohup http-server &
```
