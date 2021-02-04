import http from 'http';
import express from 'express';
import basicAuth from 'express-basic-auth';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { serverGateways } from 'vizhub-server-gateways';
import { apiController, jwtAuth, oembedController } from 'vizhub-controllers';
import { setJSDOM } from 'vizhub-presenters';
import { JSDOM } from 'jsdom';
import { serveFrontend } from './serveFrontend';
import { serveShareDB } from './serveShareDB';

setJSDOM(JSDOM);

const expressApp = express();

if (process.env.VIZHUB_BASIC_AUTH === 'true') {
  expressApp.use(basicAuth({
    users: { 'admin': process.env.VIZHUB_ADMIN_PASSWORD },
    challenge: true,
    realm: 'VizHub',
  }));
}

// We need the raw body to verify webhook signatures.
// Let's compute it only when hitting the Stripe webhook endpoint.
// From https://github.com/stripe-samples/checkout-single-subscription/blob/master/client-and-server/server/node/server.js
expressApp.use(
  express.json({
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);

expressApp.use(bodyParser.json({ limit: '2mb' }));
expressApp.use(cookieParser());

const server = http.createServer(expressApp);

serveShareDB(server);

const initGateways = async () => {
  const gateways = await serverGateways();
  jwtAuth(expressApp, gateways.userGateway);
  apiController(expressApp, gateways);

  oembedController(expressApp, gateways);
  serveFrontend(expressApp, gateways);

  const port = 4000;
  server.listen(port);
  console.log(`Listening at http://localhost:${port}`);
};
initGateways();
