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

`nvm install node`
