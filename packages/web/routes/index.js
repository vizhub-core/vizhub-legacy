import NextRoutes from 'next-routes';

export const routes = NextRoutes()
  .add('auth/callback', '/auth/callback')
  .add('auth/error', '/auth/error')
  .add('auth', '/auth')
  .add('edit-visualization', '/:userName/:id/edit')
  .add('view-visualization', '/:userName/:id');

export const edit = ({userName, id}) => `/${userName}/${id}/edit`;
export const viewVisualization = ({userName, id}) => `/${userName}/${id}`;
