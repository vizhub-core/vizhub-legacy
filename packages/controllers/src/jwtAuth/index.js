import { authMe, authCI, auth, authSignOut } from './routes';

export const jwtAuth = (app, userGateway) => {
  app.post('/api/auth/:type', auth(userGateway));
  app.get('/api/auth/me', authMe(userGateway));
  app.post('/api/auth/ci', authCI);
  app.get('/api/auth/signOut', authSignOut);
};

export { getUserIDFromJWT } from './jwt';
