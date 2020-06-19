import express from 'express';
import path from 'path';
import fs from 'fs';
import { serveVizPage } from 'vizhub-controllers';
import { serveHomePage } from 'vizhub-controllers';

const buildPath = path.join(__dirname, '..', 'build');
const indexHTMLPath = path.join(buildPath, 'index.html');

// Necessary only in production or when manually testing unfurl.
let indexHTML = 'Did you forget to run <code>npm run build</code>?';
try {
  indexHTML = fs.readFileSync(indexHTMLPath, 'utf8');
} catch (error) {
  // Fail silently, as this is likely a dev environment.
  // Doesn't matter, as create-react-app dev server serves index.html.
}

// Serve the frontend build for production deployment.
// Assumes that `npm run build` has been run in the frontend.
export const serveFrontend = (app, gateways) => {
  app.use(
    express.static(buildPath, { index: false })
    // TODO explore caching again carefully
    //express.static(path.join(__dirname, '..', 'build'), {
    //  maxAge: '2 days'
    //})
  );

  app.get('/:userName/:vizId', serveVizPage(gateways, indexHTML));

  app.get('*', serveHomePage(indexHTML));
};
