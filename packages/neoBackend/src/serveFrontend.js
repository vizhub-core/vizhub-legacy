import express from 'express';
import path from 'path';
import { serveVizPage } from './serveVizPage';

// Serve the frontend build for production deployment.
// Assumes that `npm run build` has been run in the frontend.
export const serveFrontend = (app, gateways) => {
  app.use(
    express.static(path.join(__dirname, '..', 'build'))
    // TODO explore caching again carefully
    //express.static(path.join(__dirname, '..', 'build'), {
    //  maxAge: '2 days'
    //})
  );

  app.get('/:userName/:vizId', serveVizPage);

  // Always serve index.html, let React Router take care of the rest.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
};
