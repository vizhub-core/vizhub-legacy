import NextRoutes from 'next-routes'

export const routes = NextRoutes()
  .add('edit-visualization', '/edit-visualization/:id');

export const edit = ({id}) => `/edit-visualization/${id}`;
