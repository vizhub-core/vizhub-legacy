const DEV_GITHUB_ID = '75389c43f767c2dd2347';
const DEV_GITHUB_SECRET = '99a50654eb1244953dcbbe9093703ff83c537b08';

module.exports = () => {
  let providers = [];

  providers.push({
    providerName: 'GitHub',
    providerOptions: {
      scope: ['email', 'public_profile']
    },
    Strategy: require('passport-github').Strategy,
    strategyOptions: {
      clientID: process.env.GITHUB_ID || DEV_GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET || DEV_GITHUB_SECRET,
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
