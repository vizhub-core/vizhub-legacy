/**
 * next-auth.config.js Example
 *
 * Environment variables for this example:
 *
 * PORT=3000
 * SERVER_URL=http://localhost:3000
 * MONGO_URI=mongodb://localhost:27017/my-database
 *
 * If you wish, you can put these in a `.env` to seperate your environment 
 * specific configuration from your code.
 **/

// Load environment variables from a .env file if one exists
require('dotenv').load();

const nextAuthProviders = require('./next-auth.providers');
const nextAuthFunctions = require('./next-auth.functions');

// If we want to pass a custom session store then we also need to pass an 
// instance of Express Session along with it.
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);

// If no store set, NextAuth defaults to using Express Sessions in-memory
// session store (the fallback is intended as fallback for testing only).
let sessionStore; 
if (process.env.MONGO_URI) { 
  sessionStore = new MongoStore({
    url: process.env.MONGO_URI,
    autoRemove: 'interval',
    autoRemoveInterval: 60 * 24, // Removes expired sessions every 24 hours
    collection: 'sessions',
    stringify: false
  });
}  

module.exports = (userController, expressApp) => () => {
  // We connect to the User DB before we define our functions. 
  // next-auth.functions.js returns an async method that does that and returns 
  // an object with the functions needed for authentication.
  return nextAuthFunctions(userController)
    .then(functions => ({
      // Define a port (if none passed, will not start Express)
      // Note: This project omits a port for NextAuth as it uses Express to
      // add additional routes for the examples, so it takes control of
      // starting Express, rather than leaving it to NextAuth.
      // port: process.env.PORT || 3000,
      // Secret used to encrypt session data on the server.
      sessionSecret: 'fdhjasklds8anvr8398',
      // Maximum Session Age in ms (optional, default is 7 days).
      // The expiry time for a session is reset every time a user revisits 
      // the site or revalidates their session token. This is the maximum 
      // idle time value.
      sessionMaxAge: 60000 * 60 * 24, // 24 hours
      // Session Revalidation in X ms (optional, default is 60 seconds).
      // Specifies how often a Single Page App should revalidate a session.
      // Does not impact the session life on the server, but causes clients 
      // to refetch session info (even if it is in a local cache) after N 
      // seconds has elapsed since it was last checked so they always display 
      // state correctly.
      // If set to 0 will revalidate a session before rendering every page.
      sessionRevalidateAge: 60000,
      // Canonical URL of the server (optional, but recommended).
      // e.g. 'http://localhost:3000' or 'https://www.example.com' 
      // Used in callbak URLs and email sign in links. It will be auto 
      // generated if not specified, which may cause problems if your site 
      // uses multiple aliases (e.g. 'example.com and 'www.examples.com').
      serverUrl: process.env.SERVER_URL || null,
      // Add an Express Session store.
      expressSession: expressSession,
      sessionStore: sessionStore,
      // Define oAuth Providers
      providers: nextAuthProviders(),
      // Disable body parser so we can customize how it's invoked.
      bodyParser: false,
      expressApp,

      // Disable CSRF as this has lead to mysterious errors for legit users.
      csrf: false,

      // Define functions for manging users and sending email.
      functions: functions
    }));
};
