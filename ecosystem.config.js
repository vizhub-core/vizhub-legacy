module.exports = {
  apps: [
    {
      script: 'npm start',
      watch: '.',
    },
  ],

  deploy: {
    production: {
      key: '/home/curran/Dropbox/nv.pem',
      user: 'ubuntu',
      host: 'beta.vizhub.com',
      ref: 'origin/master',
      repo: 'git@github.com:curran/vizhub-v3.git',
      path: '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
