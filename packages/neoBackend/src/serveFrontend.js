import express from 'express';

import path from 'path';

// Serve the frontend build for production deployment.
// Assumes that `npm run build` has been run in the frontend.
export const serveFrontend = app => {
  app.use(
    express.static(path.join(__dirname, '..', 'build'))
    // TODO explore caching again carefully
    //express.static(path.join(__dirname, '..', 'build'), {
    //  maxAge: '2 days'
    //})
  );

  // Always serve index.html, let React Router take care of the rest.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
};
