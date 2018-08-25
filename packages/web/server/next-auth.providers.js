// Load environment variables from a .env file if one exists
require('dotenv').load();

module.exports = () => {
  let providers = [];

  providers.push({
    providerName: 'GitHub',
    providerOptions: {
      scope: ['email', 'public_profile']
    },
    Strategy: require('passport-github').Strategy,
    strategyOptions: {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profileFields: ['id', 'displayName', 'email', 'link']
    },
    getProfile(profile) {
      // Normalize profile into one with {id, name, email} keys
      return {
        id: profile.id,
        name: profile._json.name,
        email: profile._json.email
      };
    }
  });
  
  return providers;
};
