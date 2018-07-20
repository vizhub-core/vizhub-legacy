// This reports errors to https://sentry.io for alerts.
import Raven from 'raven';

export const setupRaven = expressApp => {
  Raven.config('https://fa728910e7374f7a8be9ef439d153436@sentry.io/1246750').install();
  expressApp.use(Raven.requestHandler());

  expressApp.get('/testRaven', (req, res) => {
      throw new Error('Broke!');
  });

  expressApp.use(Raven.errorHandler());
};
