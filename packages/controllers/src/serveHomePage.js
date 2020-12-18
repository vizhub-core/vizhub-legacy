import { servePage } from './servePage';

const meta = {
  title: 'VizHub - data visualization platform',
  description:
    'Learn to code interactive graphics & data visualization with Web technologies!',
  image: '/images/unfurl-logo.png',
  url: '/',
};

export const serveHomePage = (gateways, indexHTML) => {
  const servePageMiddleware = servePage(indexHTML, meta);
  return async (req, res) => {
    return servePageMiddleware(req, res);
  };
};
