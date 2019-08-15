//const get = require('lodash/get')
//const { isIncrementViewCount } = require('../db/accessors')
import { parse } from 'cookie';
import { getUserIDFromJWT } from 'vizhub-controllers';
import { DOCUMENT_CONTENT, DOCUMENT_INFO, fetchShareDBDoc } from 'vizhub-database';

export const accessControl = (shareDB, connection) => {

  console.log('setting up accessControl');

  // Populates request.agent.userId or request.agent.isServer.
  //
  // This ShareDB middleware triggers when new connections are made,
  // whether from the browser or from the server.
  shareDB.use('connect', (request, done) => {
    // If the connection is coming from the browser,
    if (request.req) {
      const cookie = request.req.headers.cookie;
      if (cookie) {
        const { vizHubJWT } = parse(cookie);

        // and the user is authenticated,
        // expose the user id to downstram middleware via agent.session.
        if (vizHubJWT) {
          request.agent.userId = getUserIDFromJWT(vizHubJWT);
        }
      }
    } else {
      // Otherwise set a flag that clarifies that
      // the connection is coming from the server (e.g. for creating User entries).
      request.agent.isServer = true;
    }

    done();
  });

  // Populates request.owner with the user id of the owner of the document
  // to which the op is being applied.
  shareDB.use('apply', (request, done) => {
    const { collection, snapshot, op, id } = request;

    // Do nothing in the case of create ops.
    if (op.create){
      return done();
    }

    // For info documents and migrated content documents,
    // expose the owner ID as request.owner .
    if (snapshot.data.owner) {
      request.owner = snapshot.data.owner;
      //console.log('owner exists! ' + request.owner);
      return done();
    }

    // Handle migration case, where owner ID is not present on content documents.
    if (collection === DOCUMENT_CONTENT && !snapshot.data.owner) {

      // query for corresponding info document
      fetchShareDBDoc(DOCUMENT_INFO, id, connection)
        .then(shareDBDoc => {
          request.owner = shareDBDoc.data.owner;
          done();

          // TODO populate original doc with this owner
        })
    }
  });

  // This middleware applies access control rules to all ops (changes).
  shareDB.use('apply', (request, done) => {

    console.log('inside second middleware, owner ID is ' + request.owner);

    // Unpack the ShareDB request object.
    const {
      collection,
      op,
      //agent: {
      //  isServer,
      //  userId
      //},
      snapshot
    } = request;

    //if(op.create){
    //  console.log(JSON.stringify(op, null, 2));
    //}

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

    done();
  });
};
