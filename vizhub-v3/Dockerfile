# Inspired by
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
# https://mherman.org/blog/dockerizing-a-react-app/

FROM node:16
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 3000
CMD [ "npm", "start" ]
