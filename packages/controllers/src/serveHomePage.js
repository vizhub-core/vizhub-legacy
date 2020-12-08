import { SendEvent } from 'vizhub-use-cases';
import { servePage } from './servePage';

const meta = {
  title: 'VizHub - data visualization platform',
  description:
    'Learn to code interactive graphics & data visualization with Web technologies!',
  image: '/images/unfurl-logo.png',
  url: '/',
};

export const serveHomePage = (gateways, indexHTML) => {
  const sendEvent = new SendEvent(gateways);
  const servePageMiddleware = servePage(indexHTML, meta);
  return async (req, res) => {
    sendEvent.execute({
      eventIDs: ['event', 'event.pageview', 'event.pageview.home']
    });
    return servePageMiddleware(req, res);
  };
};
