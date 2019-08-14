//const get = require('lodash/get')
//const { isIncrementViewCount } = require('../db/accessors')

// This module implements access control rules at the ShareDB layer.
// This prevents, for example, editing documents you don't own.

// Middleware usage inspired by
// https://github.com/dmapper/sharedb-access/blob/master/lib/index.js

export const accessControl = shareDB => {

  // This ShareDB middleware triggers when new connections are made,
  // whether from the browser or from the server.
  shareDB.use('connect', (request, done) => {

    // If the connection is coming from the browser,
    if (request.req) {

      console.log(Object.keys(request.req));

      // expose the session to downstram middleware as agent.session.
      request.agent.session = request.req.session
    } else {

      // Otherwise set a flag that clarifies that
      // the connection is coming from the server (e.g. for creating User entries).
      request.agent.isServer = true
    }

    done()
  })

  // // This middleware applies to all ops (changes).
  // shareDB.use('apply', (request, done) => {

  //   // Unpack the ShareDB request object.
  //   const {
  //     op,
  //     agent: {
  //       isServer,
  //       session
  //     },
  //     snapshot
  //   } = request

  //   // Get the id of the currently logged in user from the session.
  //   const userId = get(session, 'passport.user.id')

  //   // Get the owner id.
  //   const owner = (
  //     op.create
  //       ? (op.create.data || {}) // Handle the case of a creation op.
  //       : snapshot.data // Handle ops on an existing document.
  //   ).owner

  //   // Get the collaborators.
  //   const collaborators = get(snapshot, 'data.collaborators')

  //   // Access control rules:

  //   // Allow server code to do anything (e.g. create and update User entries).
  //   if (isServer) {
  //     return done()
  //   }

  //   // Anyone can increment a view count.
  //   if (isIncrementViewCount(op)) {
  //     return done()
  //   }

  //   // For all ops, owner must be the logged in user.
  //   if (!userId) {
  //     return done('You must be logged in to edit.')
  //   }

  //   // Check that the user is either the owner or a collaborator.
  //   if (owner !== userId) {
  //     const ids = (collaborators || []).map(({id}) => id)
  //     const isCollaborator = ids.filter(id => id === userId).length
  //     if (!isCollaborator) {
  //       return done('You must be the owner of this document or a collaborator in order to edit it.')
  //     }
  //   }

  //   done()
  // })
}
