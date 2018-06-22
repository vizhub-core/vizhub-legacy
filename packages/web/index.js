'use strict'

const next = require('next')
const nextAuth = require('next-auth')
const nextAuthConfig = require('./next-auth.config')

const routes = {
  account:  require('./routes/account')
}

// Load environment variables from .env file if present
require('dotenv').load()

process.on('uncaughtException', function(err) {
  console.error('Uncaught Exception: ', err)
})

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection: Promise:', p, 'Reason:', reason)
})

process.env.PORT = 3000;

console.log(`NODE_ENV is ${process.env.NODE_ENV}`);

// Initialize Next.js
const nextApp = next({
  dir: '.',
  dev: (process.env.NODE_ENV === 'development')
})

// Add next-auth to next app
nextApp
  .prepare()
  .then(nextAuthConfig)
  .then(nextAuthOptions => nextAuth(nextApp, nextAuthOptions))
  .then(nextAuthOptions => {
    // Get Express and instance of Express from NextAuth
    const express = nextAuthOptions.express
    const expressApp = nextAuthOptions.expressApp

    // Add account management route - reuses functions defined for NextAuth
    routes.account(expressApp, nextAuthOptions.functions)

    // Default catch-all handler to allow Next.js to handle all other routes
    expressApp.all('*', nextApp.getRequestHandler())

    expressApp.listen(process.env.PORT, err => {
      if (err) {
        throw err
      }
      console.log('> Ready on http://localhost:' + process.env.PORT + ' [' + process.env.NODE_ENV + ']')
    })
  })
  .catch(err => {
    console.log('An error occurred, unable to start the server')
    console.log(err)
  })
