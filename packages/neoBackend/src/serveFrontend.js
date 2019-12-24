import express from 'express';
import path from 'path';
import fs from 'fs';
import { serveVizPage } from 'vizhub-controllers';

const buildPath = path.join(__dirname, '..', 'build');
const indexHTMLPath = path.join(buildPath, 'index.html');
const indexHTML = fs.readFileSync(indexHTMLPath, 'utf8');

// Serve the frontend build for production deployment.
// Assumes that `npm run build` has been run in the frontend.
export const serveFrontend = (app, gateways) => {
  app.use(
    express.static(buildPath)
    // TODO explore caching again carefully
    //express.static(path.join(__dirname, '..', 'build'), {
    //  maxAge: '2 days'
    //})
  );

  app.get('/:userName/:vizId', serveVizPage(gateways, indexHTML));

  // Always serve index.html, let React Router take care of the rest.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
};
