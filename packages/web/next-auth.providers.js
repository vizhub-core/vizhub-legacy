/**
 * next-auth.providers.js Example
 *
 * This file returns a simple array of oAuth Provider objects for NextAuth.
 *
 * This example returns an array based on what environment variables are set,
 * with explicit support for Facebook, Google and Twitter, but it can be used
 * to add strategies for other oAuth providers.
 *
 * Environment variables for this example:
 *
 * FACEBOOK_ID=
 * FACEBOOK_SECRET=
 * GOOGLE_ID=
 * GOOGLE_SECRET=
 * TWITTER_KEY=
 * TWITTER_SECRET=
 *
 * If you wish, you can put these in a `.env` to seperate your environment 
 * specific configuration from your code.
 **/

// Load environment variables from a .env file if one exists
require('dotenv').load()

module.exports = () => {
  let providers = []

  providers.push({
    providerName: 'GitHub',
    providerOptions: {
      scope: ['email', 'public_profile']
    },
    Strategy: require('passport-github').Strategy,
    strategyOptions: {
      clientID: 'a225561936bbdcafb559', //process.env.GITHUB_ID,
      clientSecret: '42a2d3f646ef4fd2568dc67eeb52bcfed9fd8abd', //process.env.GITHUB_SECRET,
      profileFields: ['id', 'displayName', 'email', 'link']
    },
    getProfile(profile) {
      // Normalize profile into one with {id, name, email} keys
      return {
        id: profile.id,
        name: profile.displayName,
        email: profile._json.email
      }
    }
  })
  
  return providers
}
