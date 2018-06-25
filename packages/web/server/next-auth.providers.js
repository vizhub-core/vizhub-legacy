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
