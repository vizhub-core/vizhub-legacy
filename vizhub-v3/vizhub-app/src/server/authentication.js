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

// Inspired by https://www.passportjs.org/tutorials/google/
export const authentication = (app, gateways) => {
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
        scope: ['googleProfile', 'email'],
      },
      async (issuer, googleProfile, cb) => {
        // googleProfile looks like this
        // {
        //   id: '105450333734875361810',
        //   displayName: 'Curran Kelleher',
        //   name: { familyName: 'Kelleher', givenName: 'Curran' },
        //   emails: [ { value: 'curran@vizhub.com' } ]
        // }
        if (
          googleProfile &&
          googleProfile.emails &&
          googleProfile.emails[0] &&
          googleProfile.emails[0].value
        ) {
          const email = googleProfile.emails[0].value;

          // TODO look up user by email.
          // TODO Create new user entry if it does not exist
          // TODO store googleProfile for future reference.
          //const user = await gateways.upsertUser({ email, googleProfile })

          cb(null, { id: 'some-user', email, googleProfile });
        } else {
          cb(new Error('No email address available.'));
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
    console.log('in serializeUser');
    console.log(user);
    process.nextTick(() => {
      cb(null, { id: user.id, username: user.username, name: user.name });
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
