//const get = require('lodash/get')
//const { isIncrementViewCount } = require('../db/accessors')
import { parse } from 'cookie';
import { getUserIDFromJWT } from 'vizhub-controllers';

export const accessControl = shareDB => {

  // This ShareDB middleware triggers when new connections are made,
  // whether from the browser or from the server.
  shareDB.use('connect', (request, done) => {

    // If the connection is coming from the browser,
    if (request.req) {
      const cookie = request.req.headers.cookie;
      if(cookie){
        const { vizHubJWT } = parse(cookie);

        // and the user is authenticated,
        // expose the user id to downstram middleware via agent.session.
        if(vizHubJWT){
          request.agent.userId = getUserIDFromJWT(vizHubJWT);
        }
      }
    } else {

      // Otherwise set a flag that clarifies that
      // the connection is coming from the server (e.g. for creating User entries).
      request.agent.isServer = true
    }

    done()
  })

  // This middleware applies to all ops (changes).
  shareDB.use('apply', (request, done) => {

    // Unpack the ShareDB request object.
    const {
      op,
      agent: {
        isServer,
        userId
      },
      snapshot
    } = request

    if(op.create){
      console.log(JSON.stringify(op, null, 2));
    }

    //// Get the owner id.
    //const { owner } = 
    //  op.create
    //    ? (op.create.data || {}) // Handle the case of a creation op.
    //    : snapshot.data // Handle ops on an existing document.

    //// Get the collaborators.
    //const collaborators = get(snapshot, 'data.collaborators')

    //// Access control rules:

    //// Allow server code to do anything (e.g. create and update User entries).
    //if (isServer) {
    //  return done()
    //}

    //// Anyone can increment a view count.
    //if (isIncrementViewCount(op)) {
    //  return done()
    //}

    //// For all ops, owner must be the logged in user.
    //if (!userId) {
    //  return done('You must be logged in to edit.')
    //}

    //// Check that the user is either the owner or a collaborator.
    //if (owner !== userId) {
    //  const ids = (collaborators || []).map(({id}) => id)
    //  const isCollaborator = ids.filter(id => id === userId).length
    //  if (!isCollaborator) {
    //    return done('You must be the owner of this document or a collaborator in order to edit it.')
    //  }
    //}

    done()
  })
}
