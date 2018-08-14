import NextRoutes from 'next-routes';

export const routes = NextRoutes()
  .add('auth/callback', '/auth/callback')
  .add('auth/error', '/auth/error')
  .add('auth', '/auth')
  .add('create-visualization', '/create-visualization')
  .add('upload-dataset', '/upload-dataset')
  .add('profile', '/:userName')
  .add('visualization', '/:userName/:id')
  .add('dataset', '/:userName/datasets/:slug');
