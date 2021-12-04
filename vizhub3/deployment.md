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

## Build

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
