# vizhub2
VizHub 2.0

## Getting Started as a Developer

```
cd vizhub2
npm install
npm run bootstrap
```

```
cd packages/backend
npm start
```

```
cd packages/frontend
npm start
```

## Production Deployment

```
cd packages/frontend
npm run build
```

Set NGINX to forward port 80 to 4000, our server (which serves the fresh frontend build).,
