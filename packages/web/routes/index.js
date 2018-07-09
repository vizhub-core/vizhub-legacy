import NextRoutes from 'next-routes'

export const routes = NextRoutes()
  .add('edit-visualization', '/edit/:id')
  .add('view-visualization', '/:userName/:id');

export const edit = ({id}) => `/edit/${id}`;
export const viewVisualization = ({userName, id}) => `/${userName}/${id}`;
