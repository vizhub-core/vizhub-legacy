// TODO
// https://github.com/jaredhanson/passport-github
// https://www.npmjs.com/package/passport-saml
// https://www.npmjs.com/package/connect-redis

// https://github.com/jaredhanson/passport-twitter
//
//   * Just use Okta?
//     https://developer.okta.com/docs/guides/auth-js/main/
//     https://github.com/okta/okta-auth-js/tree/master/samples/generated/static-spa

import passport from 'passport';
import GoogleStrategy from 'passport-google-oidc';
import session from 'express-session';
import { FindOrCreateUser } from 'vizhub-interactors';

// Inspired by https://www.passportjs.org/tutorials/google/
export const authentication = ({ app, gateways }) => {
  const findOrCreateUser = FindOrCreateUser(gateways);

  app.use(
    session({
      secret: 'super duper secret',
      resave: false,
      saveUninitialized: false,
      // In memory store used by default.
      // TODO Redis Store
      // https://www.npmjs.com/package/connect-redis
      //store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
    })
  );

  app.use(passport.authenticate('session'));

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env['VIZHUB_GOOGLE_CLIENT_ID'],
        clientSecret: process.env['VIZHUB_GOOGLE_CLIENT_SECRET'],
        callbackURL: '/oauth2/redirect/google',
        scope: [
          'profile',
          'email',
          // This might get us more emails (good for identity resolution),
          // but this scope adds more barrier to entry as Googls asks
          // the user something like "Are you sure you trust VizHub?"...
          //'https://www.googleapis.com/auth/user.emails.read'
        ],
      },
      async (issuer, googleProfile, cb) => {
        try {
          const user = await findOrCreateUser({ googleProfile });
          cb(null, user);
        } catch (error) {
          cb(error);
        }
      }
    )
  );
  app.get('/login/federated/google', passport.authenticate('google'));

  app.get(
    '/oauth2/redirect/google',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login',
    })
  );

  passport.serializeUser((user, cb) => {
    process.nextTick(() => {
      cb(null, user);
    });
  });

  passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
      return cb(null, user);
    });
  });

  app.post('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
  });
};
