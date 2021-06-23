module.exports = {
  apps: [
    {
      script: 'server/build/bundle.js',
      watch: '.',
    },
  ],

  deploy: {
    production: {
      key: '"/home/curran/Dropbox/Datavis Tech/nv.pem"',
      user: 'ubuntu',
      host: 'beta.vizhub.com',
      ref: 'origin/master',
      repo: 'git@github.com:curran/vizhub-v3.git',
      path: '/',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
